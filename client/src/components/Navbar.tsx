import logo from "../assets/logo.png";

export interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Navbar: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="nav">
      <div>
        <img src={logo} alt="ds demo chat logo" />
        <h1>DS Demo Chat App</h1>
      </div>
      <button type="button" onClick={onClick}>
        Quit
      </button>
    </div>
  );
};
