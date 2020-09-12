import { useState, useEffect, Fragment } from "react";
import { getLastArrayElem } from "../helpers/exports";
import { $USE_CASH } from "../helpers/cash";
import styled from "styled-components";

const [initialValues, { deleteCache }] = $USE_CASH(
	(fields, { getArray = false } = {}) => {
		if (getArray) return new Array(fields).fill(0).map((_, idx) => idx + 1);

		var initialValues = {};
		for (let i = 1; i < fields + 1; i++) initialValues[i] = "";
		return initialValues;
	},
	{ getUtils: true }
);

function CodeInput({
	getCodesOnCompilate = () => {},
	inputProps = idx => ({}),
	getCodes = () => {},
	autoFocusOnMount = true,
	fields = 4,
}) {
	const [codes, setCodes] = useState(initialValues(fields));
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
					e.preventDefault();
					// onChange will not called
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
		return deleteCache;
	}, []);

	return (
		<X>
			<InputsWrapper>
				<div>
					{initialValues(fields, { getArray: true }).map(i => {
						return (
							<Fragment key={i}>
								<input
									autoComplete="off"
									{...inputProps(i)}
									type="text"
									name={`code-${i}`}
									value={codes[i]}
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
			</InputsWrapper>
		</X>
	);
}

export default function Test() {
	const getCodesOnCompilate = x => {
		console.log(x);
	};

	return <CodeInput getCodesOnCompilate={getCodesOnCompilate} fields={20}></CodeInput>;
}

const InputsWrapper = styled.div(({ theme: { flex } }) => {
	return {
		...flex(),
		width: "50%",
		height: "50%",
		border: "1px solid red",
		"> div": {
			...flex(),
			flexDirection: "row-reverse",
			border: "1px solid #DADADA",
			borderRadius: "4px",
			width: "50%",
			height: "50px",
			"> input": {
				width: "25%",
				height: "100%",
				textAlign: "center",
				background: "transparent",
				border: "none",
				outline: "none",
			},
		},
	};
});

const X = styled.main(({ theme: { flex } }) => {
	return {
		...flex(),
		width: "100%",
		height: "60vh",
	};
});
