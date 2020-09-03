import React from "react";

export default function Test() {
	return null;
}
const div = React.createElement("div", { onClick: () => {}, style: { color: "red" } });
console.log(div);
