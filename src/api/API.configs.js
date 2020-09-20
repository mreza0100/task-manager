const API_CONFIGS = {
	baseURL: "http://45.93.170.150:8012/v1/",
	dispatch: false,
	getState: false,
	debug: false,
	details: false,
	req: null,
	res: null,
	isPrivetRoute: false,
	ignoreStatuses: [],
	pendingID: false,
	kickOn401: true,
	logError: true,
	inBrowser: typeof window !== "undefined",
	describeError() {
		for (let i = 0; i < 100; i++) console.error(`<<<<<<<<<<<API need a describe<<<<<<<<<<<${i}`);
		throw Error("<<<<<<<<<<<API need a describe<<<<<<<<<<<");
	},
	inServerWithNoReqOrRes() {
		for (let i = 0; i < 100; i++) console.error(`<<<<<<<<<<<in server with no req or res<<<<<<<<<<<${i}`);
		throw Error("<<<<<<<<<<<in server with no req or res<<<<<<<<<<<");
	},
};
const consoleCss = [
	"width: 400px",
	"background: linear-gradient(#06d35b, #571402)",
	"border: 1px solid #3E0E02",
	"color: white",
	"text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
	"line-height: 40px",
	"font-weight: bold",
].join(";");
const axiosConfigs = {
	timeout: 15000,
};

export { axiosConfigs, consoleCss };
export default API_CONFIGS;
