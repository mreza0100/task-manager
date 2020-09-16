import $CACH from "./cash";

const resetInput = {
	"input, textarea": {
		border: "1px solid transparent",
		transition: "border 0.5s",
		outline: "none",
		"&::placeholder": {
			color: "#B4BCCA",
			opacity: "1",
		},
		"&:focus": {
			border: "1px solid #5460FE",
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
	transition,
	$blue,
	$blueTxt,
	$white,
	$black,
	$bolderBlue,
	resetInput,
};
