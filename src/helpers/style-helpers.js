import $CACH from "./cash";

const resetInput = {
	"input, textarea": {
		// border: "none",
		outline: "none",
		"&::placeholder": {
			color: "#B4BCCA",
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
	transition,
	$blue,
	$blueTxt,
	$white,
	$black,
	$bolderBlue,
	resetInput,
};
