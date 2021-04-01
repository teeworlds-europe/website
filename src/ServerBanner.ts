import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";
import { Link } from "react-router-dom";
import IconOnline from "./images/icon-online.svg";
import "./ServerBanner.scss";

const ServerBanner = (props: ServersProps) => {
	const [server, setTopServer] = useState({
		name: "-",
		gametype: "-",
		max_clients: 0,
		num_clients: 0,
		address: null,
		port: 0,
		bestPlayer: "-",
		score: 0,
	});
	useEffect(() => {
		let server: undefined | Server = props.servers
			.filter((server) => server.state === "online")
			.sort((a, b) => a.num_clients < b.num_clients
				? 1
				: a.num_clients > b.num_clients
					? -1
					: 0
			)[0];
		if (!server) {
			return;
		}
		let bestPlayer: undefined | Client = server.clients.sort((a, b) =>
			a.score < b.score
			? 1
			: a.score > b.score
				? -1
				: 0
		)[0];
		setTopServer({
			...server,
			bestPlayer: bestPlayer ? bestPlayer.name : "-",
			score: bestPlayer ? bestPlayer.score : 0,
		});
	}, [props.servers]);

	return html`<dl>
		<div class="server-banner__name">
			<dt>Server name</dt>
			<dd>
				<div>
					<img alt="Server online" src=${IconOnline}/>
					<p>${server.name}</p>
				</div>
			</dd>
		</div>
		<div class="server-banner__mode">
			<dt>Game mode</dt>
			<dd>${server.gametype}</dd>
		</div>
		<div class="server-banner__players">
			<dt>Players</dt>
			<dd>${server.num_clients}/${server.max_clients}</dd>
		</div>
		<div class="server-banner__address">
			<dt>Address</dt>
			<dd>${server.address ? server.address + ":" + server.port.toString() : "-"}</dd>
		</div>
		<div class="server-banner__best">
			<dt>Best player</dt>
			<dd>${server.bestPlayer}</dd>
		</div>
		<div class="server-banner__score">
			<dt>Score</dt>
			<dd>${server.score}</dd>
		</div>
		<div class="server-banner__details">
			<${Link} to=${server.address
				? `/servers/${server.address}/${server.port}`
				: "#"
			}>More details</${Link}>
		</div>
	</dl>`;
};

export default ServerBanner;
