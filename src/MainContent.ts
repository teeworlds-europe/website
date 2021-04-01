import { html } from 'htm/preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import "./MainContent.scss";

const MainContent = (props: Props) => {
	return html`<div class="main-content">
		${props.children}
		<div class="sidebar__wrapper">
			<section class="content-section sidebar__discord">
				<a href=${DISCORD_INVITE}>
					<div class="sidebar__discord__logo">
						<${FontAwesomeIcon} icon=${faDiscord} size="lg"/>
					</div>
					<div>
						<div>Join our server on</div>
						<div class="sidebar__discord__title">Discord</div>
					</div>
				</a>
			</section>
		</div>
	</div>`
}

export default MainContent;
