import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function LogoutButton() {

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  let navigate = useNavigate();

  if (isLogged) {
    return (
      < form type="submit"
        className="logout-button"
        to="/"
        onClick={() => {
          dispatch(logOut());
          navigate("/", { replace: true });
        }}>

        <button className="logout-button-icon p-2"><FontAwesomeIcon icon={faPowerOff} className="icon" /></button>

      </form>
    )
  }
};

export default LogoutButton;