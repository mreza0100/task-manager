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
	req: false,
	res: false,
	isPrivetRoute: false,
	pendingID: false,
	ignoreStatuses: [],
	kickOn401: true,
	logError: false,
	inBrowser: typeof window !== "undefined",
	describe() {
		for (let i = 0; i < 10; i++) {
			console.error("<<<<<<<<<<<API need a describe<<<<<<<<<<<");
		}
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
		this.inBrowser = process.browser && AC.inBrowser;
		this.describe = describe ?? AC.describe();
		this.isPrivetRoute /*need token*/ = isPrivetRoute ?? AC.isPrivetRoute;
		this.$XHR = Axios.create({
			baseURL: this.baseURL,
			...configs,
		});
		this.ignoreStatuses = ignoreStatuses ?? AC.ignoreStatuses;
		this.kickOn401 = kickOn401 ?? AC.kickOn401;
		this.logError = logError ?? AC.logError;
		if (this.inBrowser) {
			this.pendingID = pendingID ?? AC.pendingID;
		} else this.pendingID = false;
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
		if (this.inBrowser) return Router.push("/register-progsess/login");
		serverRedirect({ res: this.res, route: "/register-progsess/login" });
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
		if (this.inBrowser && !isUndefined(err.response) && this.ignoreStatuses) {
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
			// if err.response was undefined internet is disconnected
			showMsg(
				{
					title: { text: "مشکل شبکه " },
					body: { text: "احتمالا اتصال شما مشکل دارد" },
				},
				{ status: "danger" }
			);
		}
		if (this.debug)
			this._debugCenter({
				res: err,
				url,
				params,
				data,
				callback,
			});
		try {
			const status = err.response.status;
			if (this.isPrivetRoute) {
				if (status === 404 && this.inBrowser) return reloadRouter();
				if (status === 401 && !this.kickOn401) return this._redirectToLogin();
			}
			// TODO: deleting token for 401 status
		} catch (reason) {
			if (this.logError) console.dir(err);
		}
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

	Get = ({ url, params, data, callback } = {}) =>
		this.request({ url, params, data, callback }, "get");
	Post = ({ url, params, data, callback } = {}) =>
		this.request({ url, params, data, callback }, "post");
	Put = ({ url, params, data, callback } = {}) =>
		this.request({ url, params, data, callback }, "put");
	Delete = ({ url, params, data, callback } = {}) =>
		this.request({ url, params, data, callback }, "delete");
}

// ? INITING HOOK

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

// this.xhr.interceptors.request.use(configs => {
// 	if (this.isPrivetRoute) {
// 		const token = this._getToken();
// 		if (!token) return this._redirectToLogin();
// 		if (configs.data) configs.data = { ...configs.data, token };
// 		else configs.params = { ...configs.params, token };
// 		// _beforeEachRequest() {}
// 	}
// 	return configs;
// });
// this.xhr.interceptors.response.use(this._handleRes, this._handleErr);

// this.dispatch = /*  dispatch ?? */ AC.dispatch;
// this.getState = /* getState ??  */ AC.getState;
/*
 dispatch, getState, 
log("dispatch        ::::", !!this.dispatch);
log("getState        ::::", !!this.getState);
*/
