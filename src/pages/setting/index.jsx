import { serverRedirect } from "../../helpers/exports";

export default function HomeSetting() {
	return <h1>there is no index page for setting</h1>;
}

export const getServerSideProps = ({ res }) => {
	serverRedirect({ res, route: "/setting/profile" });
	return { props: {} };
};
