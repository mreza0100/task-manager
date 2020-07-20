export default function HomeSetting() {
	return <h1>there is no index page for setting</h1>;
}
// TODO: react_devtools_backend.js:2273 Warning: Did not expect server HTML to contain a <style> in <div>.
export const getServerSideProps = ({ res }) => {
	res.writeHead(302, { Location: "/setting/profile" }).end();
	return { props: {} };
};
