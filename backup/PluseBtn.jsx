// import { useDispatch, useSelector } from "react-redux";
// import { togglePluse } from "../redux/actions/pluse";
// import { flex } from "../helpers/exports";
// import styled from "styled-components";

// export default function PluseBtn({ extraClass }) {
// 	const handleTogglePluseMode = () => dispatch(togglePluse());
// 	const isPluseMode = useSelector(state => state.isPluseMode);
// 	const dispatch = useDispatch();

// 	return (
// 		<StyledPluse
// 			isPluseMode={isPluseMode}
// 			className={`fa fa-plus ${extraClass ?? ""}`}
// 			title={isPluseMode ? "برای بستن دکمه اسکیپ را فشار دهید" : "برای باز شدن کلیک کنید"}
// 			onClick={handleTogglePluseMode}
// 		/>
// 	);
// }
// const StyledPluse = styled.i(({ isPluseMode }) => {
// 	return {
// 		...flex(),
// 		transition: "all 0.3s",
// 		fontSize: "1.1em",
// 		padding: "10px",
// 		borderRadius: "100%",
// 		transform: `rotate(${isPluseMode ? 45 : 0}deg)`,
// 		backgroundColor: isPluseMode ? "#6b6b50b8" : "#2422b9",
// 		width: "35px",
// 		height: "35px",
// 		position: "relative",
// 		top: "3px",
// 		cursor: "pointer",
// 		"&:hover": {
// 			transform: `scale(1.2) rotate(${isPluseMode ? 45 : 0}deg)`,
// 		},
// 	};
// });