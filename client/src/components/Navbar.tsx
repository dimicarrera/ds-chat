import logo from "../assets/logo.png";

import classnames from "./Navbar.module.css";

export interface Props {
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Navbar: React.FC<Props> = ({ onClick }) => {
	return (
		<div className={classnames.nav}>
			<div className={classnames.heading}>
				<img src={logo} alt="ds demo chat logo" className={classnames.logo} />
				<h1>Dmitri's Comfy Chat</h1>
			</div>
			<div>
				<button type="button" onClick={onClick} className={classnames.button}>
					Sign Out
				</button>
			</div>
		</div>
	);
};
