import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";
import useLocation from "wouter-preact/use-location";
import "./App.scss";
import ServerBanner from "./ServerBanner";
import MainContent from "./MainContent";
import LatestNews from "./LatestNews";
import Navbar from "./Navbar";
import ServerDetails from "./ServerDetails";
import ServersList from "./ServersList";
import { fetchServers } from "./utils";

const App = () => {
	const [servers, setServers] = useState([]);
	const [location, setLocation] = useLocation();

	useEffect(() => {
		(async () => {
			setServers(await fetchServers());
		})();
	}, []);

	const renderContent = () => {
		let matched;
		if (
			matched = /^\/servers\/(?<address>[^\/]+)\/(?<port>[^\/]+)$/
				.exec(location)
		) {
			return html`<${ServerDetails}
				servers=${servers}
				address=${matched.groups.address}
				port=${matched.groups.port}
			/>`;
		} else if (location === "/servers") {
			return html`<section class="content-section servers-list">
				<${ServersList} servers=${servers}/>
			</section>`;
		} else {
			return html`<section class="content-section latest-news">
				<${LatestNews}/>
			</section>`;
		}
	}

	return html`
		<section class="navbar"><${Navbar}/></section>
		<section class="content-section server-banner">
			<${ServerBanner} servers=${servers}/>
		</section>
		<${MainContent}>
			${renderContent()}
		</${MainContent}>
	`;
};

export default App;
