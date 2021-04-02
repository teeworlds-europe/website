import { html } from 'htm/preact';
import useLocation from "wouter-preact/use-location";
import { Switch, Route } from "react-router-dom";
import DiscordLogo from "./images/Discord-Logo-White.svg";
import DiscordWordmark from "./images/Discord-Wordmark-White.svg";
import "./MainContent.scss";

const MainContent = (props: Props) => {
	const [location, setLocation] = useLocation();

	const renderSidebar = () => {
		if (location == "/") {
			return html`<div class="sidebar__wrapper">
				<section class="content-section sidebar__discord">
					<a href=${DISCORD_INVITE}>
						<img class="sidebar__discord__logo" alt="Discord logo" src=${DiscordLogo}/>
						<div>
							<div class="sidebar__discord__join-text">Join our server on</div>
							<img class="sidebar__discord__wordmark" alt="Discord wordmark" src=${DiscordWordmark}/>
						</div>
					</a>
				</section>
			</div>`;
		} else {
			return html`<div></div>`;
		}
	}

	return html`<div class="main-content">
		${props.children}
		${renderSidebar()}
	</div>`
}

export default MainContent;
