import { getCookie, reloadRouter, isUndefined, serverRedirect } from "../helpers/exports";
import AC /*as APIConfigs*/, { consoleCss } from "./API.configs";
import showMsg from "../helpers/alerts/msg";
import { login } from "../routes";
import Router from "next/router";
import Axios from "axios";

const dash = "-------";

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
		ignoreStatuses,
		describe,
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
		this.ignoreStatuses = ignoreStatuses ?? AC.ignoreStatuses;
		this.isPrivetRoute /*need token*/ = isPrivetRoute ?? AC.isPrivetRoute;
		this.kickOn401 = kickOn401 ?? AC.kickOn401;
		this.logError = logError ?? AC.logError;
		this.pendingID = this.inBrowser ? pendingID ?? AC.pendingID : false;
		this.$XHR = Axios.create({
			baseURL: this.baseURL,
			...configs,
		});
		if (!this.inBrowser && (!this.req || !this.res)) AC.inServerWithoNoReqOrRes();
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
		if (this.inBrowser) return Router.push(login);
		serverRedirect({ res: this.res, route: login });
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
			if (status === 404 && this.inBrowser) return reloadRouter();
			if (this.isPrivetRoute) {
				if (status === 401 && !this.kickOn401) return this._redirectToLogin();
			}
			// TODO: deleting token for 401 status
		}

		if (this.logError) console.dir(err);
	}

	_permissionDenied(why = "") {
		console.warn("Permission Denied | pendingList: ", pendingList);
		return new Promise((resolve, reject) => {
			// "in pendingList or token not received"
			reject({ status: 0, msg: why });
		});
	}

	_filterDataBeforSend(data) {
		var token;
		if (this.isPrivetRoute) token = this._getToken();
		else return [data, null];
		if (token) return [{ ...data, token }, false];
		return [null, true];
	}

	_requestPermission() {
		if (this.pendingID) {
			if (pendingList.includes(this.pendingID)) return false;
			pendingList.push(this.pendingID);
		}
		return true;
	}

	request({ url, params, data, callback } = {}, method) {
		var error = null;
		if (!this._requestPermission()) return this._permissionDenied("in pendingList");
		if (method === "get") [params, error] = this._filterDataBeforSend(params);
		else [data, error] = this._filterDataBeforSend(data);
		if (error) return this._permissionDenied("token not received");

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

class APIUtils {
	static checkInPendingList(pendingID) {
		if (pendingList.includes(pendingID)) {
			console.warn(pendingList);
			return false;
		}
		return true;
	}
}

export default API;
export { _USE_API_, APIUtils };
