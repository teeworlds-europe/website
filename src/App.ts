import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
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

	useEffect(() => {
		(async () => {
			setServers(await fetchServers());
		})();
	}, []);

	return html`<${Router}>
		<section class="navbar"><${Navbar}/></section>
		<section class="content-section server-banner">
			<${ServerBanner} servers=${servers}/>
		</section>
		<${MainContent}>
			<${Switch}>
				<${Route}
					path="/servers/:server/:port"
					render=${(props: {}) => html`<section class="content-section server-details">
						<${ServerDetails} ...${props} servers=${servers}/>
					</section>`}
				/>
				<${Route}
					path="/servers"
					render=${(props: {}) => html`<section class="content-section servers-list">
						<${ServersList} ...${props} servers=${servers}/>
					</section>`}
				/>
				<${Route}
					path="/"
					render=${(props: {}) => html`<section class="content-section latest-news">
						<${LatestNews} ...${props}/>
					</section>`}
				/>
			</${Switch}>
		</${MainContent}>
	</${Router}>`;
};

export default App;
