import { useSelector } from "react-redux";
import { serverRedirect } from "../../helpers/exports";
import { register } from "../../routes";

export default function Confirm({ mobile }) {
	console.log(mobile);
	return null;
}
Confirm.getInitialProps = ({ store: { getState }, req, res }) => {
	// const { confirm } = getState();
	// if (!confirm) serverRedirect({ res, route: register });
	// return {props:confirm.mobile}
	return { mobile: "10312" };
};
