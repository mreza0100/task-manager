import { flex } from "../../helpers/exports";
import SettingLayout from "../../layout/Setting.layout";
import { _USE_API_ } from "../../api/index.API";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { useState } from "react";

const __dataInputs__ = [
	{ name: "name", label: "نام", type: "text" },
	{ name: "family", label: "نام خانوادگی", type: "text" },
	{ name: "mobile", label: "شماره همراه", type: "text" },
	{ name: "email", label: "ایمیل", type: "email" },
];

export default function profile(props) {
	const [editMod, setEditMod] = useState(false);

	const onToggleEdit = e => {
		e.preventDefault();
		setEditMod(!editMod);
	};

	return (
		<SettingLayout>
			<Formik
				initialValues={{
					name: "a",
					family: "b",
					email: "abc@gmail.com",
					mobile: "03616546469874",
				}}
				onSubmit={data => {
					// TODO: filter data for mobile
					console.log(data);
				}}
				// validationSchema={null}
			>
				{({ errors, values: v }) => {
					return (
						<Form className="row m-0">
							{__dataInputs__.map(({ name, label, type }) => {
								if (editMod && name === "mobile")
									return (
										<StyledShow className="col-12 " key={name}>
											<span className="w-25">{label} :</span>
											<span>{v[name]}</span>
										</StyledShow>
									);
								if (editMod)
									return (
										<StyledShow key={name} className="col-12">
											<Field name={name} type={type} placeholder={label} />
										</StyledShow>
									);

								return (
									<StyledShow className="col-12 " key={name}>
										<span className="w-25">{label} :</span>
										<span>{v[name]}</span>
									</StyledShow>
								);
							})}
							<div className="w-100 d-flex justify-content-end">
								{(editMod && (
									<>
										<button
											className="btn btn-warning  mt-3 ml-3"
											onClick={onToggleEdit}
										>
											لغو <i className="fa fa-times p-2" />
										</button>
										<button className="btn btn-success  mt-3">
											ثبت <i className="fa fa-save p-2" />
										</button>
									</>
								)) || (
									<button
										className="btn btn-primary"
										type="button"
										onClick={onToggleEdit}
									>
										ویرایش <i className="fa fa-edit p-2" />
									</button>
								)}
							</div>
						</Form>
					);
				}}
			</Formik>
		</SettingLayout>
	);
}

const StyledShow = styled.div(props => {
	return {
		...flex(["justifyContent"]),
		width: "100%",
		textAlign: "right",
		margin: "25px 0",
		fontSize: "20px",
		// color: "#fff",
		"> span": {
			background: "#1c443d27",
		},
	};
});
