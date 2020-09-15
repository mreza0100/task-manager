import { copyToClipboard } from "../../helpers/exports";
import showMsg from "../../helpers/alerts/msg";
import styled from "styled-components";

function handleCopy(taskID) {
	if (copyToClipboard(`${location.origin}/?id=${taskID}`)) {
		showMsg(
			{ title: { text: "با موفقیت کپی شد", nodeName: "h6" } },
			{ time: 6, status: "success", pendingID: `copy-${taskID}` }
		);
	} else showMsg({ title: { text: "مرورگر شما برای این کار قدیمی است" } }, { time: 5, status: "warning" });
}
export default function CopyBtn({ taskID }) {
	return <CopyI className="icon-copy" onClick={() => handleCopy(taskID)} title="کپی URL تسک" />;
}

const CopyI = styled.i(({ theme: { flex, $blueTxt } }) => {
	return {
		...flex(),
		width: "29px",
		height: "29px",
		borderRadius: "100px",
		fontSize: "13px",
		transition: "all 0.3s",
		color: "#E4EAF0",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#F6F9FE",
			color: $blueTxt,
		},
	};
});
