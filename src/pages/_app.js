import NextApp from "next/app";
import Head from "next/head";
// Router for NProgress
import Router from "next/router";
// NProgress
import NProgress from "nprogress";
import { wrapper } from "../redux/store";
// all general styles
import "../styles/general.scss";
import { ThemeProvider } from "styled-components";
// style helpers in styled component props
import styleHelpers from "../helpers/style-helpers";
import { reloadRouter } from "../helpers/exports";

Router.onRouteChangeStart = () => {
	if (!Router.showNprogress) Router.showNprogress = true;
	else NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

if (process.browser) Router.reloadRouter = reloadRouter;

// !--->>>

class App extends NextApp {
	state = { mokeNumber: 0 };
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			},
		};
	}
	render() {
		const { Component, pageProps } = this.props;
		pageProps.reload = () => this.setState({ mokeNumber: 10 });

		return (
			<>
				<Head>
					<link rel="shortcut icon" href={require("../assets/svg/miz-logo.svg")} />
				</Head>
				<ThemeProvider theme={styleHelpers}>
					<Component {...pageProps} />
				</ThemeProvider>
			</>
		);
	}
}
export default wrapper.withRedux(App);

// function ForUsingHooks({ children }) {
// return <ThemeProvider theme={styleHelpers}>{children}</ThemeProvider>;
// }

// import dynamic from "next/dynamic";
// export default dynamic(() => Promise.resolve(wrapper.withRedux(App)), {
// 	ssr: false,
// });

// export function reportWebVitals(metric) {
// 	console.log(metric);
// }
