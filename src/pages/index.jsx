import styled from "styled-components";
import MainLayout from "../layout/Main.lauout";

export default function Index() {
	return (
		<MainLayout>
			<main>
				<h1>hi</h1>
			</main>
		</MainLayout>
	);
}

Index.getInitialProps = ctx => {
	return {};
};
