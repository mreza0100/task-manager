// function flex(whatIDontWant = []) {
// 	let s = { display: "flex" };
// 	if (!whatIDontWant.includes("alignItems")) s = { ...s, alignItems: "center" };
// 	return !whatIDontWant.includes("justifyContent") ? (s = { ...s, justifyContent: "center" }) : s;
// }

const flex = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};
const butyInputs = {
	"input, textarea": {
		borderRadius: "5px",
		padding: "5px 8px",
		margin: "10px 0",
		border: "1px #3c615ba1 solid",
		transition: "all .2s linear",
		"&::placeholder": {
			color: "black",
			opacity: "1",
		},
		"&:focus": {
			outline: "none",
			border: "1px #475993 solid",
			boxShadow: "3px 3px #475993a4",
		},
	},
};
const transition = {
	transition: `0.3s ease-in-out,background-color 
                0.3s ease-in-out,border-color 
                0.3s ease-in-out,box-shadow 
                0.3s ease-in-out;`,
};

export default {
	flex,
	butyInputs,
	transition,
};
