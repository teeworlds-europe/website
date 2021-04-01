import { html } from 'htm/preact';
import IconTeeYellow from "./images/icon-tee-yellow.png";
import IconTeePink from "./images/icon-tee-pink.png";
import "./LatestNews.scss";

const articles = [
	{
		title: "Public vanilla servers have been launched",
		image: IconTeePink,
		date: "2020-07-23",
		content: "CTF5, DM and LTS servers have been launched in middle Europe. In-game chat is connected to dedicated Discord channels and vice versa. Enjoy low latency gameplay!",
	},
];

const Article = (props: Props) => {
	return html`<article key=${props.title + props.date}>
		<img alt="article header" src=${props.image}/>
		<div>
			<h1>${props.title}</h1>
			<p><small><date datetime=${props.date}>${props.date}</date></small></p>
			<p>${props.content}</p>
		</div>
	</article>`;
}

const LatestNews = () => {
	return html `
		<header>
			<img alt="" src=${IconTeeYellow}/>
			<h1>Latest news</h1>
		</header>
		${articles.map((article) => html`<${Article} ...${article}/>`)}
	`;
}

export default LatestNews;
