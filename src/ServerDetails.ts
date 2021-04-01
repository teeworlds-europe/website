import { html } from "htm/preact";
import "./ServerDetails.scss";

interface ServerDetailsProps extends ServersProps {
	match: {
		params: {
			server: string,
			port: string,
		}
	}
}

const ServerDetails = (props: ServerDetailsProps) => {
	let server: undefined | Server = props.servers.filter((server) =>
		server.address == props.match.params.server && server.port === Number(props.match.params.port)
	).pop();
	if (!server) {
		return html`No server "${props.match.params.server}:${props.match.params.port}" has been found!`;
	}

	return html`
		<section>
			<h1>Server details</h1>
			<dl>
				<div>
					<dt>Server name</dt>
					<dd>${server.name}</dd>
				</div>
				<div>
					<dt>Address</dt>
					<dd>${server.address}</dd>
				</div>
				<div>
					<dt>Port</dt>
					<dd>${server.port}</dd>
				</div>
				<div>
					<dt>Game mode</dt>
					<dd>${server.gametype}</dd>
				</div>
				<div>
					<dt>Map</dt>
					<dd>${server.map}</dd>
				</div>
				<div>
					<dt>Players</dt>
					<dd>${server.num_clients}/${server.max_clients}</dd>
				</div>
				<div>
					<dt>Players in game</dt>
					<dd>${server.num_players}/${server.max_players}</dd>
				</div>
				<div>
					<dt>Status</dt>
					<dd>${server.state}</dd>
				</div>
				<div>
					<dt>Last status update</dt>
					<dd>${new Date(Number(server.timestamp) * 1000).toLocaleString('pl')}</dd>
				</div>
			</dl>
		</section>
		<section>
			<h1>Players</h1>
			<table class="table">
				<thead>
					<tr>
						<th>Player</th>
						<th>Clan</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					${server.clients
						.sort((a, b) => a.score < b.score
							? 1
							: a.score > b.score
								? -1
								: 0
						)
						.map((client) => html`
							<tr key=${
								client.name
									+ client.clan
									+ client.country.toString()
									+ client.score.toString()
									+ client.team.toString()
							}>
								<th scope="row">${client.name}</th>
								<td>${client.clan}</td>
								<td>${client.score}</td>
							</tr>
						`)
					}
				</tbody>
			</table>
		</section>
	`;
}

export default ServerDetails;
