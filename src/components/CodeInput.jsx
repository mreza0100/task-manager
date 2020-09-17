import { useState, useEffect, Fragment } from "react";
import { getLastArrayElem } from "../helpers/exports";
import { $USE_CASH } from "../helpers/cash";
import styled from "styled-components";

const [initialValues, { resetCache }] = $USE_CASH(
	(fields, { getArray = false } = {}) => {
		if (getArray) return new Array(fields).fill(0).map((_, idx) => idx + 1);

		var initialValues = {};
		for (let i = 1; i < fields + 1; i++) initialValues[i] = "";
		return initialValues;
	},
	{ getUtils: true }
);

export { initialValues };
export default function CodeInput({
	title = "",
	error = "",
	getCodesOnCompilate = () => {},
	getCodes = () => {},
	inputProps = idx => ({}),
	autoFocusOnMount = true,
	fields = 4,
	extraStyles = {},
	codes,
	setCodes,
}) {
	const joinedCodes = Object.values(codes).join("");

	getCodes(joinedCodes);
	if (joinedCodes.length === fields) getCodesOnCompilate(joinedCodes);

	const changeFocus = inputNumber => {
		if (!codes.hasOwnProperty(inputNumber)) return;
		// out of range
		document.querySelector(`input[name='code-${inputNumber}']`).focus();
	};

	const moveFocusTo = moveTo => {
		const currentFocus = document.querySelector(`input:focus`);
		if (currentFocus.name.slice(0, 5) !== "code-") return;
		const currentFocusNumber = Number(currentFocus.name.split("-")[1]);
		const targetFocusNumber = currentFocusNumber + moveTo;
		changeFocus(targetFocusNumber);
	};

	const checkChangeFocus = e => {
		// 8  is for backspace   <--
		// 39 is for right arror ->
		// 37 is for left  arrow <-
		switch (e.which ?? e.keyCode) {
			case 8:
				if (!e.target.value) {
					moveFocusTo(-1);
					e.preventDefault(/*onChange will not call*/);
				}
				break;
			case 39:
				moveFocusTo(1);
				break;
			case 37:
				moveFocusTo(-1);
				break;
		}
	};

	const onChange = ({ target }) => {
		const inputNumber = target.name.split("-")[1];
		const newCodes = { ...codes };
		const value = target.value;

		if (isNaN(Number(value)) || value.length > 1) return;
		// its not a number or more then 1 char

		newCodes[inputNumber] = value;
		setCodes(newCodes);

		if (value) moveFocusTo(1);
	};

	useEffect(() => {
		if (autoFocusOnMount) document.querySelector("input[name='code-1']").focus();
		setCodes(initialValues(fields));
		return resetCache;
	}, []);

	return (
		<>
			<InputsWrapper extraStyles={extraStyles}>
				<label>{title}</label>
				<div>
					{initialValues(fields, { getArray: true }).map(i => {
						return (
							<Fragment key={i}>
								<input
									autoComplete="off"
									{...inputProps(i)}
									type="text"
									name={`code-${i}`}
									value={codes[i] || ""}
									onChange={onChange}
									onKeyDown={checkChangeFocus}
								/>
								{i !==
									getLastArrayElem(
										initialValues(fields, { getArray: true })
									) && "-"}
							</Fragment>
						);
					})}
				</div>
				{error && <span className="error">{error}</span>}
			</InputsWrapper>
		</>
	);
}

const InputsWrapper = styled.div(({ theme: { flex }, extraStyles }) => {
	return {
		...flex(),
		flexDirection: "column",
		textAlign: "right",
		"> label": {
			width: "100%",
			padding: "0 15px",
			fontStyle: "normal",
			fontWeight: "500",
			fontSize: "14px",
			lineHeight: "23px",
			color: "#54698D",
		},
		"> div": {
			...flex(),
			flexDirection: "row-reverse",
			width: "100%",
			height: "50px",
			marginBottom: "10px",
			border: "1px solid #DADADA",
			borderRadius: "4px",
			"> input": {
				width: "25%",
				height: "100%",
				textAlign: "center",
				background: "transparent",
				border: "none",
				outline: "none",
			},
		},
		"> span.error": {
			width: "100%",
			color: "red",
			textAlign: "right",
			padding: "0 15px",
		},
		...extraStyles,
	};
});
