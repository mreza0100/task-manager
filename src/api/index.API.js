import { getCookie, reloadRouter, isUndefined, serverRedirect } from "../helpers/exports";
import AC /*as APIConfigs*/, { axiosConfigs, consoleCss } from "./API.configs";
import showMsg from "../helpers/alerts/msg";
import { login } from "../routes";
import Router from "next/router";
import Axios from "axios";

var pendingList = [];

class API {
	constructor({
		baseURL,
		debug,
		details,
		req,
		res,
		isPrivetRoute,
		axiosCustomConfigs,
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
		this.describe = describe ?? AC.describeError();
		this.ignoreStatuses = ignoreStatuses ?? AC.ignoreStatuses;
		this.isPrivetRoute /*need token*/ = isPrivetRoute ?? AC.isPrivetRoute;
		this.kickOn401 = kickOn401 ?? AC.kickOn401;
		this.logError = logError ?? AC.logError;
		this.pendingID = this.inBrowser ? pendingID ?? AC.pendingID : false;
		if (!this.inBrowser && (!this.req || !this.res)) AC.inServerWithNoReqOrRes();
		this.$XHR = Axios.create({
			baseURL: this.baseURL,
			...axiosConfigs,
			...axiosCustomConfigs,
		});
	}

	_debugCenter = ({ res, url, params, data, callback }) => {
		const dash = "-------";
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
		if (this.debug) {
			this._debugCenter({
				res,
				url,
				params,
				data,
				callback,
			});
		}
		return res;
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
					{ status: "danger", time: 8 }
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
		if (this.debug) {
			this._debugCenter({
				res: err,
				url,
				params,
				data,
				callback,
			});
		}

		if (!isUndefined(err.response)) {
			const status = err.response.status;
			if (status === 404 && this.inBrowser) return reloadRouter();
			if (this.isPrivetRoute) {
				if (status === 401 && !this.kickOn401) return this._redirectToLogin();
			}
			// TODO: deleting token for 401 status
		}

		if (this.logError) console.dir(err);
		if (!err.response) {
			// its happens when connection was disconnect
			const extend = {
				response: {
					status: 0,
					data: {},
				},
			};
			return { ...err, extend };
		}

		return err;
	}

	_permissionDenied(why = "") {
		console.warn("Permission Denied | pendingList: ", pendingList);
		console.warn("why: ", why);
		return new Promise((resolve, reject) => {
			// in pendingList or token not received
			reject({ status: 0, msg: why });
		});
	}

	_requestPermission() {
		if (this.pendingID) {
			if (pendingList.includes(this.pendingID)) return false;
			pendingList.push(this.pendingID);
		}
		return true;
	}

	_filterDataBeforSend({ params, data }, { method }) {
		var token, error;
		if (this.isPrivetRoute) {
			token = this._getToken();
			if (!token) error = "token not received";
		}

		if (token) {
			params = method === "GET" ? { ...params, token } : null;
			data = method !== "GET" ? { ...data, token } : null;
			return [{ params, data }, error];
		}
		return [{ params, data }, error];
	}

	REQUEST({ url, params, data, callback } = {}, method) {
		var error = null;
		if (!this._requestPermission()) return this._permissionDenied("in pendingList");
		[{ params, data }, error] = this._filterDataBeforSend({ params, data }, { method });
		if (error) return this._permissionDenied(error);

		return new Promise((resolve, reject) => {
			this.$XHR
				.request({ params, data, url, method })
				.then(res => {
					this._afterGetResponse();
					const filtredRes = this._handleRes({
						res,
						url,
						params,
						data,
						callback,
					});
					resolve(filtredRes);
				})
				.catch(err => {
					this._afterGetResponse();
					const filtredErr = this._handleErr({
						err,
						url,
						params,
						data,
						callback,
					});
					reject(filtredErr);
				})
				.finally(callback);
		});
	}

	Get = ({ url, params, data, callback } = {}) => this.REQUEST({ url, params, data, callback }, "GET");
	Post = ({ url, params, data, callback } = {}) => this.REQUEST({ url, params, data, callback }, "POST");
	Put = ({ url, params, data, callback } = {}) => this.REQUEST({ url, params, data, callback }, "PUT");
	Delete = ({ url, params, data, callback } = {}) => this.REQUEST({ url, params, data, callback }, "DELETE");
}

function _USE_API_({
	baseURL,
	debug,
	details,
	res,
	req,
	isPrivetRoute,
	pendingID,
	describe,
	ignoreStatuses,
	kickOn401,
	logError,
	axiosCustomConfigs,
} = {}) {
	return new API({
		baseURL,
		debug,
		details,
		res,
		req,
		isPrivetRoute,
		pendingID,
		describe,
		ignoreStatuses,
		kickOn401,
		logError,
		axiosCustomConfigs,
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
