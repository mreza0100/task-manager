// const validation = yup.object({
// 	todo: yup.string().required().trim(),
// })
// <Input>
// 	<Formik
// 		initialValues={{
// 			todo: "",
// 		}}
// 		onSubmit={data => {
// 			dispatch(setTodo(data));
// 		}}
// 		validationSchema={validation}
// 	>
// 		{() => (
// 			<Form className="row">
// 				<button type="submit" className="col-2 btn btn-outline-success">
// 					Add item
// 				</button>
// 				<Field
// 					className="col-9"
// 					name="todo"
// 					autocomplite="off"
// 					placeholder="فردا باید برم خرید و..."
// 				/>
// 			</Form>
// 		)}
// 	</Formik>
// </Input>;
// const Input = styled.li(props => {
// 	return {
// 		width: "100%",
// 		"> form": {
// 			...flex(["justifyContent"]),
// 			justifyContent: "space-evenly",
// 			width: "100%",
// 			...butyInputs,
// 			"> button": {
// 				height: "100%",
// 			},
// 		},
// 	};
// });
