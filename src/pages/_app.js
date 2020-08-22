import NextApp from "next/app";
import Head from "next/head";
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
import { ThemeProvider } from "styled-components";
// style helpers in styled components props
import styleHelpers from "../helpers/style-helpers";

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

function ForUsingHooks({ children }) {
	return <ThemeProvider theme={styleHelpers}>{children}</ThemeProvider>;
}

class App extends NextApp {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			},
		};
	}
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<link rel="shortcut icon" href="miz-logo.svg" />
				</Head>
				<ForUsingHooks>
					<Component {...pageProps} />
				</ForUsingHooks>
			</>
		);
	}
}
export default wrapper.withRedux(App);

// import dynamic from "next/dynamic";
// export default dynamic(() => Promise.resolve(wrapper.withRedux(App)), {
// 	ssr: false,
// });

// export function reportWebVitals(metric) {
// 	console.log(metric);
// }
