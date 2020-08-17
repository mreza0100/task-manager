import $CACH from "./cash";
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

function transition(time = 0.3) {
	return $CACH("transition", time);
}

function flex(whatIDontWant = []) {
	return $CACH("flex", whatIDontWant);
}

export default {
	flex,
	butyInputs,
	transition,
};
