import { html } from 'htm/preact';
import { Link } from "react-router-dom";
import Logo from "./images/logo.png";
import "./Navbar.scss";

const Navbar = () => {
	return html`<nav>
		<img alt="Teeworlds Europe logo" src=${Logo}/>
		<ul>
			<li><${Link} to="/">Home</${Link}></li>
			<li><${Link} to="/servers">Servers</${Link}></li>
		</ul>
	</nav>`;
}

export default Navbar;
