import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BandCreationButton() {

  const isLogged = useSelector((state) => state.user.isLogged);
  let navigate = useNavigate();

  if (isLogged) {
    return (
      < form type="submit"
        className="band-create-button text-center m-auto"
        to="/"
        onClick={() => {
          console.log("Group-page");
          navigate("/band-creation", { replace: true });
        }}>
        <button className='m-auto'>+</button>
      </form>
    )
  }
};

export default BandCreationButton;