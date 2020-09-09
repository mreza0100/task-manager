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

const resetInput = {
	"input, textarea": {
		// border: "none",
		outline: "none",
		"&::placeholder": {
			color: "black",
			opacity: "1",
		},
		"&:focus": {
			// border: "none",
			outline: "none",
		},
	},
};

const transition = (time = 0.3) => $CACH("transition", time);

const flex = (whatIDontWant = []) => $CACH("flex", whatIDontWant);

const $blue = "#5460FE";
const $blueTxt = "#6FA0F1";
const $white = "#FFFFFF";
const $black = "#54698D";
const $bolderBlue = "#424DE4";

export default {
	flex,
	butyInputs,
	transition,
	$blue,
	$blueTxt,
	$white,
	$black,
	$bolderBlue,
	resetInput,
};
