import { html } from "htm/preact";
import useLocation from "wouter-preact/use-location";
import Logo from "./images/logo.png";
import "./Navbar.scss";

const Navbar = () => {
	const [location, setLocation] = useLocation();

	return html`<nav>
		<img alt="Teeworlds Europe logo" src=${Logo}/>
		<ul>
			<li><a onclick=${() => setLocation("/")}>Home</a></li>
			<li><a onclick=${() => setLocation("/servers")}>Servers</a></li>
		</ul>
	</nav>`;
}

export default Navbar;
