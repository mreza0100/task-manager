import { serverRedirect } from "../../helpers/exports";
import { login } from "../../routes";

export default function RegisterIndex() {
	return <h1>there is no index page for setting</h1>;
}
export const getServerSideProps = ({ req, res }) => {
	serverRedirect({ res, route: login });
	return { props: {} };
};
