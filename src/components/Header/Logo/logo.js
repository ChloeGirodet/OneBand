import "./logo.scss"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Logo() {

  const isLogged = useSelector((state) => state.user.isLogged);
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  let idValue = null;
  if (loggedUser) {
    idValue = loggedUser.userId;
  }

  return (
    <div className="logo sm:ml-2">
      {!isLogged &&
        <Link to="/">
          <h1><span id="O">O</span><span id="B">B</span></h1>
        </Link>
      }
      {isLogged &&
        <Link to={`/profil/${idValue}`}>
          <h1><span id="O">O</span><span id="B">B</span></h1>
        </Link>
      }
    </div>
  );
}

export default Logo;