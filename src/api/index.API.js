import { getCookie, reloadRouter, isUndefined, serverRedirect } from "../helpers/exports";
import Router from "next/router";
import Axios from "axios";
import showMsg from "../helpers/alerts/msg";
const dash = "-------";
const consoleCss = [
	"width: 400px",
	"background: linear-gradient(#06d35b, #571402)",
	"border: 1px solid #3E0E02",
	"color: white",
	"text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
	"line-height: 40px",
	"font-weight: bold",
].join(";");

const AC /* as APIConfigs */ = {
	baseURL: "http://5.63.9.74:7575/v1/",
	dispatch: false,
	getState: false,
	debug: false,
	details: false,
	req: null,
	res: null,
	isPrivetRoute: false,
	pendingID: false,
	ignoreStatuses: [],
	kickOn401: true,
	logError: true,
	inBrowser: typeof window !== "undefined",
	describe() {
		for (let i = 0; i < 100; i++) console.error(`<<<<<<<<<<<API need a describe<<<<<<<<<<<${i}`);

		throw Error("<<<<<<<<<<<API need a describe<<<<<<<<<<<");
	},
};

var pendingList = [];

class API {
	constructor({
		baseURL,
		debug,
		details,
		req,
		res,
		isPrivetRoute,
		configs,
		pendingID,
		describe,
		ignoreStatuses,
		kickOn401,
		logError,
	}) {
		this.req = req ?? AC.req;
		this.res = res ?? AC.res;
		this.debug = debug ?? AC.debug;
		this.details = details ?? AC.details;
		this.baseURL = baseURL ?? AC.baseURL;
		this.inBrowser = process.browser ?? AC.inBrowser;
		this.describe = describe ?? AC.describe();
		this.isPrivetRoute /*need token*/ = isPrivetRoute ?? AC.isPrivetRoute;
		this.ignoreStatuses = ignoreStatuses ?? AC.ignoreStatuses;
		this.kickOn401 = kickOn401 ?? AC.kickOn401;
		this.logError = logError ?? AC.logError;
		this.pendingID = this.inBrowser ? pendingID ?? AC.pendingID : false;
		this.$XHR = Axios.create({
			baseURL: this.baseURL,
			...configs,
		});
		// if (this.inBrowser) this.pendingID = pendingID ?? AC.pendingID;
		// else this.pendingID = false;
	}

	_debugCenter = ({ res, url, params, data, callback }) => {
		try {
			const { warn, log, group, groupEnd, dir } = console;
			const msg = `%c${dash}MSG from debug center->debug : [[${this.debug}]] detailes : [[${this.details}]]${dash}`;
			group("debugCenter");
			warn(msg, consoleCss);
			log("describe :::=>>>", this.describe);
			log("baseURL ::::", this.baseURL);
			log("route ::::", url);
			log("your params ::::", params);
			log("your data ::::::", data);
			log("has callback ::::::", !!callback);
			if (!!callback) log("callback ::::::", callback.toString());
			for (const key in res) {
				if (typeof res[key] !== "function" && key !== "isAxiosError")
					log(`${key} :::::`, res[key]);
			}
			groupEnd();
			if (this.details) dir(res);
		} catch (err) {
			console.warn(`${dash}INTERNAL ERROR WHILE DIBAGING${dash}`);
			console.warn(err);
		}
	};

	_redirectToLogin() {
		if (this.inBrowser) return Router.push("/register-progress/login");
		serverRedirect({ res: this.res, route: "/register-progress/login" });
	}

	_getToken() {
		try {
			const cookies = this.inBrowser ? document.cookie : this.req.headers.cookie;
			const token = getCookie({ cookies, key: "token" });
			if (!token) {
				console.log("there was no token >>> calling _redirectToLogin");
				return this._redirectToLogin();
			}
			return token;
		} catch (err) {
			return this._redirectToLogin();
		}
	}

	_afterGetResponse() {
		if (this.pendingID && pendingList.includes(this.pendingID)) {
			pendingList = pendingList.filter(id => id !== this.pendingID);
		}
	}

	_handleRes = ({ res, url, params, data, callback }) => {
		if (this.debug)
			this._debugCenter({
				res,
				url,
				params,
				data,
				callback,
			});
	};

	_handleErr({ err, url, params, data, callback }) {
		if (this.inBrowser && !isUndefined(err.response)) {
			// ant API error is throwing a msg network Error to user
			// if !isUndefined(err.response) is mean backend is working
			if (!this.ignoreStatuses.find(status => status === err.response.status))
				showMsg(
					{
						title: { text: "مشکل شبکه " },
						body: { text: `status: ${err.response.status}` },
					},
					{ status: "warning" }
				);
		}
		if (isUndefined(err.response)) {
			// if err.response was undefined its backend or connection Error
			if (this.inBrowser) {
				showMsg(
					{
						title: { text: "مشکل شبکه " },
						body: { text: "احتمالا اتصال شما مشکل دارد" },
					},
					{ status: "danger" }
				);
			} else {
				const msg = `
					<h1>Backend or Network Error</h1> <hr /><br /><br /><br />
					go to server route <a href='http://5.63.9.74:7575/v1/tasks'>go to server JSON</a>
					<br /><br /><br />
					Error::>><br /><pre>${JSON.stringify(err, undefined, "\t")}</pre>
					`;
				this.res.writeHeader(500, { "Content-Type": "text/html" }).write(msg);
				this.res.end();
			}
		}
		if (this.debug)
			this._debugCenter({
				res: err,
				url,
				params,
				data,
				callback,
			});

		if (!isUndefined(err.response)) {
			const status = err.response.status;
			if (this.isPrivetRoute) {
				if (status === 404 && this.inBrowser) return reloadRouter();
				if (status === 401 && !this.kickOn401) return this._redirectToLogin();
			}
			// TODO: deleting token for 401 status
		}

		if (this.logError) console.dir(err);
	}

	_permissionDenied() {
		console.warn("Permission Denied", pendingList);
		return new Promise((resolve, reject) => {
			reject({ status: 0, msg: "in pendingIDs" });
		});
	}

	_filterDataBeforSend(data) {
		if (this.isPrivetRoute) return { ...data, token: this._getToken() };
		return data;
	}

	_requestPermission() {
		if (this.pendingID) {
			if (pendingList.includes(this.pendingID)) return false;
			pendingList.push(this.pendingID);
		}
		return true;
	}

	request({ url, params, data, callback } = {}, method) {
		if (!this._requestPermission()) return this._permissionDenied();
		if (method === "get") params = this._filterDataBeforSend(params);
		else data = this._filterDataBeforSend(data);
		return new Promise((resolve, reject) => {
			this.$XHR
				.request({ method, url, params, data })
				.then(res => {
					this._afterGetResponse();
					this._handleRes({
						res,
						url,
						params,
						data,
						callback,
					});
					resolve(res);
				})
				.catch(err => {
					this._afterGetResponse();
					this._handleErr({
						err,
						url,
						params,
						data,
						callback,
					});
					reject(err);
				})
				.finally(callback);
		});
	}

	Get = ({ url, params, data, callback } = {}) => this.request({ url, params, data, callback }, "get");
	Post = ({ url, params, data, callback } = {}) => this.request({ url, params, data, callback }, "post");
	Put = ({ url, params, data, callback } = {}) => this.request({ url, params, data, callback }, "put");
	Delete = ({ url, params, data, callback } = {}) => this.request({ url, params, data, callback }, "delete");
}

function _USE_API_({
	baseURL,
	debug,
	details,
	headers,
	res,
	req,
	isPrivetRoute,
	axiosConfigs,
	pendingID,
	describe,
	ignoreStatuses,
	kickOn401,
	logError,
} = {}) {
	return new API({
		baseURL,
		debug,
		details,
		headers,
		res,
		req,
		isPrivetRoute,
		axiosConfigs,
		pendingID,
		describe,
		ignoreStatuses,
		kickOn401,
		logError,
	});
}

class APITools {
	static checkInPendingList(pendingID) {
		try {
			if (pendingList.includes(pendingID)) {
				console.warn(pendingList);
				return false;
			}
			return true;
		} catch (err) {
			return true;
		}
	}
}

// $>>> EXPORTS
export { API };
export { _USE_API_, APITools };
