import { copyToClipboard } from "../helpers/exports";
import showMsg from "../helpers/alerts/msg";

function handleCopy(taskID) {
	if (copyToClipboard(`${location.origin}/?id=${taskID}`)) {
		return showMsg(
			{ title: { text: "با موفقیت کپی شد", nodeName: "h6" } },
			{ time: 3, status: "success" }
		);
	}
	showMsg({ title: { text: "مرورگر شما برای این کار قدیمی است" } }, { time: 5, status: "warning" });
}
export default function CopyBtn({ taskID }) {
	return <i className="fa fa-clone" onClick={() => handleCopy(taskID)} title="کپی URL تسک" />;
}
