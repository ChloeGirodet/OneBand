import { useNavigate } from "react-router-dom";

function HeaderSearchBar() {

  const navigate = useNavigate();

  return (
    <form className="m-auto flex flex-nowrap">
      <button type="button" className="search-button m-auto"
        onClick={() => {
          navigate("/search", { replace: true });
        }}>Commence à rechercher</button>
    </form>
  );
}

export default HeaderSearchBar;