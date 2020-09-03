import React from "react";

export default function Test() {
	return null;
}

function Jojo() {
	return <main>{22}</main>;
}

function bobo() {
	return (
		<Jojo>
			<Jojo />
		</Jojo>
	);
}

// console.log(__jsx.toString());
console.log(bobo.toString());
