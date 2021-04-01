declare module "*.png" {
	const value: any;
	export default value;
}

declare module "*.svg" {
	const value: any;
	export default value;
}

declare var DISCORD_INVITE: string;
declare var ENV: string;

interface Props {
	[key: string]: any
}

interface Client {
	clan: string,
	country: number,
	name: string,
	score: number,
	team: number,
}

interface Server {
	name: string,
	gametype: string,
	max_clients: number,
	num_clients: number,
	max_players: number,
	num_players: number,
	state: string,
	address: string,
	port: number,
	clients: Array<Client>,
	timestamp: number,
	map: string,
}

interface ServersProps extends Props {
	servers: Array<Server>
}
