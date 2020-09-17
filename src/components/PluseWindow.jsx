import { stringfyDateForServer, trimObj } from "../helpers/exports";
import { getOneTask } from "../redux/actions/tasks";
import TagInput from "../components/TagInput";
import { _USE_API_ } from "../api/index.API";
import { useEffect, useState } from "react";
import showMsg from "../helpers/alerts/msg";
import DatePicker from "react-datepicker2";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment-jalaali";

async function handleSubmit(data, { dispatch, closePluseMode }) {
	data = trimObj(data, { removeEmptyArr: true });
	try {
		const res = await _USE_API_({
			isPrivetRoute: true,
			describe: "save a new task",
			debug: false,
		}).Post({
			url: "/tasks",
			data,
		});
		const taskID = res.data.data.item.id;
		if (taskID) {
			dispatch(getOneTask({ taskID }));
			closePluseMode(false);
		}
	} catch (err) {}
}

const defaultColors = [
	"#2CDA9B",
	"#FFD100",
	"#FF6672",
	"#2CBADA",
	"#DA2C60",
	"#651FFF",
	"#1DE9B6",
	"#FF9100",
	"#00B0FF",
	"#C6FF00",
];

export default function PluseWindow({ isPluseMode, setPluseMode }) {
	const [selectedColor, setSelectedColor] = useState("#2CDA9B");
	const [fromDate, setFromDate] = useState(moment());
	const [description, setDescription] = useState("");
	const [toDate, setToDate] = useState(moment());
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState([]);

	const closePluseMode = () => {
		setPluseMode(false);
	};
	const closeOnEscape = ({ key }) => {
		if (key === "Escape") closePluseMode();
	};

	useEffect(() => {
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);

	const dispatch = useDispatch();

	const onSubmit = () => {
		if (!title) return showMsg({ title: { text: "تسک به یک عنوان نیاز دارد" } }, { status: "warning" });
		const sortedData = {
			title,
			description,
			tags,
			from_date: stringfyDateForServer(fromDate),
			to_date: stringfyDateForServer(toDate),
			color: selectedColor,
		};
		handleSubmit(sortedData, { dispatch, closePluseMode });
	};

	if (!isPluseMode)
		return (
			<Background show={false}>
				<Wrapper show={false} />
			</Background>
		);
	return (
		<Background show={true}>
			<Wrapper show={true}>
				<Content>
					<i className="fa fa-times" onClick={closePluseMode} />
					<input
						type="text"
						autoComplete="off"
						placeholder="عنوان تسک خود را وارد کنید"
						id="title"
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
					<textarea
						placeholder="توضیحات"
						value={description}
						onChange={({ target }) => setDescription(target.value)}
					/>
					<div id="date_pickers">
						<div>
							<div className="font">
								<i className="icon-bag" />
							</div>
							<div className="date">
								<span>از تاریخ</span>
								<DatePicker
									isGregorian={false}
									value={fromDate}
									onChange={d => setFromDate(d)}
								/>
							</div>
						</div>
						<div>
							<div className="font">
								<i className="icon-bag" />
							</div>
							<div className="date">
								<span>تا تاریخ</span>
								<DatePicker
									isGregorian={false}
									value={toDate}
									onChange={d => setToDate(d)}
								/>
							</div>
						</div>
					</div>
					<TagInput
						tags={tags}
						setTagState={setTags}
						limit={5}
						BtnContent={
							<>
								<span>+</span>
								<span>افزودن</span>
							</>
						}
					/>
					<div id="colors">
						<span>انتخاب رنگ:</span>
						<div>
							{defaultColors.map(color => {
								return (
									<Color
										key={color}
										color={color}
										onClick={() => setSelectedColor(color)}
										isSelected={selectedColor === color}
									/>
								);
							})}
						</div>
					</div>
					<button id="save_btn" onClick={onSubmit}>
						تایید و ثبت
					</button>
				</Content>
			</Wrapper>
		</Background>
	);
}

const Color = styled.button(({ color, isSelected }) => {
	return {
		width: "30px",
		height: "100%",
		padding: 0,
		color: "#B4BCCA",
		background: color,
		border: `2px solid ${isSelected ? "black" : "transparent"}`,
		borderRadius: "4px",
		marginRight: "10px",
		outline: "none",
		transition: "border 0.5s",
		"&:focus": {
			outline: "none",
		},
		"&:active": {
			outline: "none",
		},
	};
});

const Content = styled.div(({ theme: { flex, resetInput } }) => {
	return {
		position: "relative",
		width: "100%",
		height: "100%",
		padding: "55px 30px 20px 30px",
		color: "#DADADA",
		...resetInput,
		"> *": { marginBottom: "15px" },
		"> i.fa.fa-times": {
			position: "absolute",
			top: "25px",
			right: "15px",
			padding: "10px",
			cursor: "pointer",
			fontSize: "12px",
			borderRadius: "100px",
			transition: "background-color, color 0.4s",
			"&:hover": {
				backgroundColor: "#F6F9FE",
				color: "red",
			},
		},
		"> #title": {
			width: "100%",
			height: "50px",
			padding: "13px 16px",
			background: "#F6F9FE",
			borderRadius: "4px",
		},
		"> textarea": {
			width: "100%",
			height: "200px",
			maxHeight: "200px",
			minHeight: "150px",
			padding: "13px 16px",
			border: "1px solid #DADADA",
			borderRadius: "4px",
		},
		"> #date_pickers": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			width: "100%",
			height: "30px",
			"> div": {
				...flex(["justifyContent"]),
				justifyContent: "space-between",
				height: "100%",
				width: "46%",
				".font": {
					...flex(),
					width: "30px",
					height: "100%",
					borderRadius: "4px",
					backgroundColor: "#F7F9FE",
					borderadius: "4px",
					i: { width: "75%", height: "75%", color: "#6FA0F1" },
				},
				".date": {
					...flex(),
					height: "30px",
					width: "210px",
					textAlign: "right",
					backgroundColor: "#F7F9FE",
					borderRadius: "4px",
					color: "black",
					cursor: "pointer",
					"> span": { fontSize: "14px", marginLeft: "8px", whiteSpace: "pre" },
					input: {
						width: "100%",
						fontSize: "14px",
						outline: "none",
						cursor: "pointer",
						backgroundColor: "transparent",
						padding: 0,
						"&:focus": { border: "1px solid transparent" },
					},
				},
			},
		},
		"> #colors": {
			...flex(["justifyContent"]),
			justifyContent: "space-between",
			height: "30px",
			"> div": {
				height: "100%",
			},
		},
		"> #save_btn": {
			width: "100%",
			height: "50px",
			color: "#FFF",
			fontSize: "14px",
			background: "#5460FE",
			borderRadius: "4px",
			border: "none",
			outline: "none",
		},
	};
});

const Wrapper = styled.div(({ show }) => {
	return {
		margin: "5% auto 0 auto",
		maxWidth: "600px",
		width: "600px",
		transition: "all 0.5s",
		minHeight: "610px",
		background: "#FFFFFF",
		boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "10px",
	};
});

const Background = styled.div(({ show }) => {
	return {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgb(0 0 0 / 53%)",
		height: show ? "100vh" : "0vh",
		transition: "height 0.5s",
		overflow: show ? "auto" : "hidden",
	};
});
