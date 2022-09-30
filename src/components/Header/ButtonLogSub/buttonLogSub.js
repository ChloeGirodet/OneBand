import { Link } from "react-router-dom";

function ButtonLogSub() {
  return (
    <div className="header-button">
      <Link to="/inscription" >
        <button type="button" className="register-button">S'inscrire</button>
      </Link>
      <Link to="/connexion" >
        <button className="login-button">
          <span className="">
            Connexion
          </span>
        </button>
      </Link>
    </div>
  );
}

export default ButtonLogSub;