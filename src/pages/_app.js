import NextApp from "next/app";
// Router for NProgress
import Router from "next/router";
// NProgress
import NProgress from "nprogress";
import { wrapper } from "../redux/store";
// font-awesome
import "font-awesome/css/font-awesome.min.css";
// nprogress
import "nprogress/nprogress.css";
// general styles include libs font etc...
import "../styles/general.scss";

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};
Router.onRouteChangeError = () => {
	NProgress.done();
};

// !--->>>
class App extends NextApp {
	static async getInitialProps({ Component, ctx }) {
		return {
			...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
		};
	}
	render() {
		const { Component, pageProps } = this.props;

		return <Component {...pageProps} />;
	}
}
export default wrapper.withRedux(App);

// export function reportWebVitals(metric) {
// 	console.log(metric);
// }
// *--->>>- temporarily
// import { _USE_API_ } from "../api/index.API";
// if (process.browser)
// 	window.delete_kon = mobile => {
// 		_USE_API_().Post({ url: "delete_kon", params: { mobile } });
// 	};
// *--->>>- temporarily
