import { useRef, useState } from "react";
import styled from "styled-components";

function TagInput({ tags = [], setTagState, placeholder = "اضافه کردن تگ" }) {
	const inputRef = useRef();

	const handleAddTag = () => {
		const value = inputRef.current.value;
		inputRef.current.value = "";
		setTagState(prevTags => [...prevTags, value]);
	};
	const handleDeleteTag = idx => {
		const value = inputRef.current.value;
		inputRef.current.value = "";
		setTagState(prevTags => {
			const newTags = prevTags.filter((tag, everyTagIdx) => everyTagIdx !== idx);
			return newTags;
		});
	};

	return (
		<Wrapper>
			<InputWrapper>
				<input
					type="text"
					ref={inputRef}
					onKeyDown={e => {
						if (e.key === "Enter") handleAddTag();
					}}
				/>
				<buttom>awd</buttom>
			</InputWrapper>
			<TagsWrapper>
				{tags.map((tag, idx) => (
					<span key={idx} onClick={() => handleDeleteTag(idx)}>
						#{tag}
					</span>
				))}
			</TagsWrapper>
		</Wrapper>
	);
}

const InputWrapper = styled.div(({ theme: { resetInput } }) => {
	return {
		...resetInput,
		position: "relative",
		height: "50px",
		input: { background: "#F6F9FE", border: "1px solid #F6F9FE", borderRadius: "4px" },
	};
});

const TagsWrapper = styled.div(props => {
	return {
		width: "100%",
		height: "100px",
	};
});

const Wrapper = styled.div(props => {
	return {
		width: "500px",
		height: "250px",
		margin: "50px auto",
		border: "1px solid red",
		input: {
			width: "100%",
		},
	};
});

export default function Test() {
	const [tags, setTags] = useState(["awd"]);

	return <TagInput tags={tags} setTagState={setTags} />;
}
