/* register
	? activation_code
	// delete_kon
      // active_account
      // login
      // reset_password
      // forgot_password
       todo: tasks
      profile
      people
      dashboard
	save_task_query
 */
// ! title
// description
// tags
// color STRING
// from_date
// to_date STRING
// ! ----
// todo: remind BOOL
// todo: location : {lat:"",lon:""}
// todo: people {name: "ali", id: "", pic: URL}
// todo: attachment

// title: yup.string().trim().required(),
// time: yup.string().trim(),
// desciription: yup.string().trim(),
// attachment: yup.string().trim(),

// const lastSavedDate = "2020-06-11T10:35:53.000Z";
// const todayDate = JSON.stringify(new Date());
// console.log(lastSavedDate.toString().slice(0, 10) == todayDate.slice(1, 11));

// !FIELDS
/* 						<InputTags name="tags" />
						<div className="row w-100 justify-content-center">
							<Field
								className="col-4"
								type="text"
								name="title"
								placeholder="سر تیتر"
							/>
						</div>
						<div className="row w-100 justify-content-center">
							<Field
								className="col-2"
								as="textarea"
								name="discription"
								placeholder="توضیحات"
								cols="40"
								rows="4"
							/>
						</div>
						<div className="row w-100 justify-content-center">
							<Field className="col-2" name="attachment" placeholder="پیوست" />
						</div>
						<DatePicker
							className="d-block m-auto w-50 cursor-pointer"
							isGregorian={false}
							onChange={val => setDate(val)}
							value={date}
                                    />
 */

// const editLink = (
// 	<Link href={{ pathname: "/", query: { id } }}>
// 		<i className="fa fa-pencil-square-o col" />
// 	</Link>
// );
/* 

// const CIcon = `fa fa-pencil-square-o col ${isOpenTask ? "disable" : ""}`;

/*
 <EditIcon className={CIcon} target={id} /> */

// const EditIcon = styled.i(props => {
// 	return {
// 		padding: "10px",
// 	};
// });  */

//  try {
// } catch (err) {
// 	console.log("changin route to localhost:10000");
// 	await _USE_API_({
// 		baseURL: "http://localhost:10000",
// 	})
// 		.Get({ url: "/api/getTasks" })
// 		.then(res => {
// 			dispatch({
// 				type: SET_TASKS,
// 				payload: res.data,
// 			});
// 		});
// }
