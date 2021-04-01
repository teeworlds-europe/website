const fetchServers = async (endpoint="/servers.json") => {
	let fetchedServers: Array<object> = [];
	(await (await fetch(endpoint)).text())
		.split("\n")
		.filter(line => line.length > 0)
		.forEach(line => {
			fetchedServers.push((JSON.parse(line)));
		});
	return fetchedServers;
};

export { fetchServers };
