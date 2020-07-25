import { useDispatch, useSelector } from "react-redux";
import { flex, transition } from "../helpers/exports";
import { togglePluse } from "../redux/actions/pluse";
import styled from "styled-components";

export default function PluseBtn({ extraClass }) {
	const handleTogglePluseMode = () => dispatch(togglePluse());
	const isPluseMode = useSelector(state => state.isPluseMode);
	const dispatch = useDispatch();

	return (
		<StyledPluse
			isPluseMode={isPluseMode}
			className={`fa fa-${isPluseMode ? "times" : "plus"} ${extraClass ?? ""}`}
			title={
				isPluseMode ? "برای بستن دکمه اسکیپ را فشار دهید" : "برای باز شدن کلیک کنید"
			}
			onClick={handleTogglePluseMode}
		/>
	);
}
const StyledPluse = styled.i(({ isPluseMode }) => {
	return {
		...flex(),
		...transition(),
		fontSize: "1.1em",
		padding: "10px",
		borderRadius: "100%",
		backgroundColor: isPluseMode ? "red" : "#6b6b50b8",
		width: "30px",
		height: "30px",
		cursor: "pointer",
		"&:hover": {
			transform: "scale(1.2)",
		},
	};
});
