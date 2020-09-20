import styled from "styled-components";
import { useRef } from "react";

export default function TagInput({
	tags = [],
	setTagState,
	placeholder = "اضافه کردن تگ",
	limit = Infinity,
	BtnContent,
	btnExtraStyles,
	tagExtraStyles,
}) {
	const inputRef = useRef();

	const handleAddTag = () => {
		const value = inputRef.current.value;
		if (value.length < 1 || tags.length >= limit) return;
		inputRef.current.value = "";
		setTagState(prevTags => [...prevTags, value]);
	};
	const handleDeleteTag = idx => {
		setTagState(prevTags => {
			const newTags = prevTags.filter((tag, everyTagIdx) => everyTagIdx !== idx);
			return newTags;
		});
	};

	return (
		<StyledTagInput>
			<InputWrapper extraStyles={btnExtraStyles}>
				<input
					type="text"
					ref={inputRef}
					placeholder={placeholder}
					onKeyDown={e => {
						if (e.key === "Enter") handleAddTag();
					}}
				/>
				<button onClick={handleAddTag}>{BtnContent}</button>
			</InputWrapper>
			<TagsWrapper className="tags-wrapper" extraStyles={tagExtraStyles}>
				{tags.map((tag, idx) => (
					<div key={idx}>
						<i className="fa fa-times" onClick={() => handleDeleteTag(idx)} />{" "}
						<span>#{tag}</span>
					</div>
				))}
			</TagsWrapper>
		</StyledTagInput>
	);
}

const TagsWrapper = styled.div(({ theme: { flex }, extraStyles }) => {
	return {
		...flex(["justifyContent", "alignItems"]),
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignContent: "flex-start",
		width: "100%",
		height: "auto",
		minHeight: "30px",
		"> div": {
			...flex(),
			minHeight: "30px",
			minWidth: "20px",
			fontSize: "12px",
			padding: "0 10px",
			marginLeft: "5px",
			marginTop: "5px",
			color: "#6FA0F1",
			background: "rgba(111, 160, 241, 0.05)",
			border: "1px solid rgba(111, 160, 241, 0.05)",
			borderRadius: "4px",
			"> i": {
				padding: "5px",
				cursor: "pointer",
				transition: "color 0.3s",
				marginLeft: "5px",
				"&:hover": { color: "red" },
			},
			...extraStyles,
		},
	};
});

const InputWrapper = styled.div(({ theme: { flex, resetInput }, extraStyles }) => {
	return {
		...resetInput,
		position: "relative",
		width: "100%",
		height: "50px",
		marginBottom: "12px",
		button: {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			padding: "10px",
			width: "80px",
			height: "30px",
			position: "absolute",
			left: "10px",
			top: "10px",
			color: "#2CDA9B",
			background: "rgba(44, 218, 155, 0.15)",
			border: "1px solid rgba(44, 218, 155, 0.15)",
			borderRadius: "4px",
			fontStyle: "normal",
			fontWeight: "500",
			fontSize: "12px",
			lineHeight: "20px",
			"&:focus": {
				outline: "none",
			},
			...extraStyles,
		},
		input: {
			width: "100%",
			height: "100%",
			padding: "13px 16px",
			background: "#F6F9FE",
			border: "1px solid #F6F9FE",
			borderRadius: "4px",
			"&::placeholder": { fontSize: "14px" },
			"&:focus": {
				outline: "none",
			},
		},
	};
});

const StyledTagInput = styled.div(props => {
	return {
		width: "100%",
		height: "auto",
	};
});
