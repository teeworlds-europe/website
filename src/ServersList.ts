import { html } from "htm/preact";
import useLocation from "wouter-preact/use-location";
import IconOnline from "./images/icon-online.svg";
import IconOffline from "./images/icon-offline.svg";
import "./ServersList.scss";

const ServersList = (props: ServersProps) => {
	const [location, setLocation] = useLocation();

	return html`<table class="table">
		<thead>
			<tr>
				<th>Server</th>
				<th>Online</th>
				<th>Game mode</th>
				<th>Map</th>
				<th>Players</th>
			</tr>
		</thead>
		<tbody>
			${props.servers
					.sort((a, b) => a.num_players < b.num_players
						? 1
						: a.num_players > b.num_players
							? -1
							: 0
					)
					.map((server) => {
						const {
							name,
							state,
							gametype = '-',
							map = '-',
							num_clients = '-',
							max_clients = '-'
						} = server;
						return html`
							<tr
								key=${server.address + "/" + server.port.toString()}
								onclick=${() => setLocation("/servers/" + server.address + "/" + server.port.toString())}
							>
								<th scope="row">${name}</th>
								<td>${
									state == "online"
									? html`<img alt="online" src=${IconOnline}/>`
									: html`<img alt="offline" src=${IconOffline}/>`
								}</td>
								<td>${gametype}</td>
								<td>${map}</td>
								<td>${num_clients}/${max_clients}</td>
							</tr>`;
					})
			}
		</tbody>
	</table>`;
}

export default ServersList;
