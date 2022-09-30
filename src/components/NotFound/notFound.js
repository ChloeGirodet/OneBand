import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function NotFound() {

  const isLogged = useSelector((state) => state.user.isLogged);
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  let idValue = 0;
  if (isLogged) {
    idValue = loggedUser.userId;
  };

  const bgImage = "https://i.pinimg.com/564x/2c/6f/1a/2c6f1ae6f3058a745047fc39f388c34f.jpg";

  return (
    <div className="flex flex-col w-screen flex-around h-120">
      {!isLogged &&
        <Link to="/" className="w-56 m-auto text-center px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-700">
          Back to Homepage
        </Link>
      }

      {isLogged &&
        <Link to={`/profil/${idValue}`} className="w-56 m-auto text-center px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-emerald-600 active:bg-emerald-600 hover:bg-emerald-700"
        >
          Back to Homepage
        </Link>
      }

      <div className="w-100 h-100 border-4 border-emerald-500 rounded-full relative flex items-center justify-center animate-spin-slow m-auto" style={{ backgroundImage: `url(${bgImage})` }}>
        <span className="not-found absolute top-10 right-45 text-8xl"> 404 </span>
        <div className="border border-emerald-300 bg-emerald-600 rounded-full w-32 h-32 flex items-center justify-center">
          <div className="border border-emerald-300 bg-emerald-900 rounded-full w-20 h-20 flex items-center justify-center">
            <div className="not-foundborder border-emerald-300 bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center">
            </div>
          </div>
        </div>
        <span className="not-found absolute bottom-12 right-40 text-6xl"> Not Found </span>
      </div>

    </div>
  );
};

export default NotFound;