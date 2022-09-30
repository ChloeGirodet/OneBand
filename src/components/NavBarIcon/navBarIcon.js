import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPeopleGroup, faMagnifyingGlass, faGuitar, faUserLarge, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BandCreationButton from '../UserProfile/BandCreationButton/bandCreationButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../NavBarIcon/navBarIcon.scss';

function NavBarIcon() {

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const [isBandIconActive, setBandIconActive] = useState(false);
  const [isNotifIconActive, setNotifIconActive] = useState(false);
  const [load, setLoad] = useState(true);

  let idValue = null;
  let userToken = null;
  if (loggedUser) {
    idValue = loggedUser.userId;
    userToken = loggedUser.token;
  }
  let navigate = useNavigate();

  const [userRequestFromStranger, setUserRequestFromStranger] = useState([]);
  const [requestFromBand, setRequestFromBand] = useState([]);
  const [userBand, setUserBand] = useState([]);

  useEffect(() => {
    axios.get(`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/${idValue}/user-session`)
      .then((response) => {
        setLoad(false);
        setUserRequestFromStranger(response.data.user_session.user_friends_received);
        setRequestFromBand(response.data.user_session.user_band_request);
        setUserBand(response.data.user_session.user_band);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          navigate("error", { replace: true })
        }
      });
  }, []);

  
  // ----------------------- Accept or decline Friend Request -------------------- 

  const url = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/accept-friend-request';

  const urlRemove = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/remove-friend-request';

  const submit = function submit(user, event) {
    const Data = {
      friend_request_id: user.friend_request_id,
    };
    console.log(Data);
    event.preventDefault();
    axios.defaults.headers.common.Authorization = `bearer ${userToken}`;
    axios.patch(url, Data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);

        console.log(event.target.getAttribute("data-index"));

        const objectToRemove = event.target.getAttribute("data-index");

        const newList = userRequestFromStranger.filter(userRequest => userRequest.id !== parseInt(objectToRemove));

        setUserRequestFromStranger(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const remove = function remove(user, event) {
    console.log(user);
    const DataRemove = {
      friend_request_id: user.friend_request_id,
    };
    console.log(DataRemove);
    event.preventDefault();
    axios.delete(urlRemove, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${userToken}`
      },
      data: DataRemove,

    })
      .then((response) => {
        console.log(response.data);
        console.log(event.target.getAttribute("data-index"));

        const objectToRemove = event.target.getAttribute("data-index");

        const newList = userRequestFromStranger.filter(userRequest => userRequest.id !== parseInt(objectToRemove));

        setUserRequestFromStranger(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ----------------------- Accept or decline Band Request -------------------- 

  const urlBand = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/accept-band-request';

  const urlBandRemove = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/remove-band-request';

  const submitBand = function submit(band, event) {
    const Data = {
      band_member_id: band.band_member_request_id,
    };
    event.preventDefault();
    axios.defaults.headers.common.Authorization = `bearer ${userToken}`;
    axios.patch(urlBand, Data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);

        const newBandList = requestFromBand.filter(item => item.name !== event.target.getAttribute("index-band-data"));

        setRequestFromBand(newBandList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const removeBand = function remove(band, event) {
    const DataRemove = {
      band_member_id: band.band_member_request_id,
    };
    event.preventDefault();
    axios.delete(urlBandRemove, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${userToken}`
      },
      data: DataRemove,
    })
      .then((response) => {
        console.log(response.data);

        console.log(event.target.getAttribute("index-band-data"));

        const newBandList = requestFromBand.filter(item => item.name !== event.target.getAttribute("index-band-data"));

        setRequestFromBand(newBandList);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleBandIconToggle() {
    setBandIconActive(!isBandIconActive);
  }

  function handleNotifIconToggle() {
    setNotifIconActive(!isNotifIconActive);
  }

  return (
    <ul className="nav-bar-icon">
      <li className='li-icon'>
        <NavLink to={`/profil/${idValue}`}>
          <FontAwesomeIcon icon={faHouse} className="icon" color="#c7d2fe" />
        </NavLink>

      </li>
      <li className='li-icon-list relative'>

        <div className='w-3 h-3 -top-1 left-1 rounded-full border-2 bg-amber-500 border-emerald-500 shadow-xl shadow-emerald-300/200 animate-bounce absolute'></div>
        <button className='w-10' onClick={handleNotifIconToggle}>
          <FontAwesomeIcon icon={faGuitar} className={isNotifIconActive ? "text-amber-400 icon " : "icon"} color="#c7d2fe" />
        </button>
        <div className={isNotifIconActive ? "block li-notif-list scroller" : "hidden "}>
          {userRequestFromStranger.map((user) =>

            <div className="nav-band-button pb-5">
              <div className="text-center truncate text-amber-400" key={user.friend_request_id}>

                <Link to={`/profil/${user.id}`}>
                  <img className="profil-relation-image border-4 border-amber-400"
                    src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${user.imageName}`} alt={user.username} title={`${user.username}`}></img>
                  <p className="text-sm">{user.username}</p>
                </Link>
              </div>
              <div className="notif-button w-full m-auto flex flex-row justify-around mt-1">
                <form
                  method="PATCH"
                  data-index={user.id}
                  onSubmit={(event) => submit(user, event)}>
                  <button type="submit" className="text-emerald-400 border-2 border-emerald-200 rounded-full flex items-center justify-center w-6 h-6 text-sm hover:bg-emerald-200 hover:text-emerald-900 duration-100" color="#c7d2fe"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </form>

                <form
                  method="DELETE"
                  data-index={user.id}
                  onSubmit={(event) => remove(user, event)}>
                  <button type="submit" className="text-amber-400 border-2 border-amber-200 rounded-full flex items-center justify-center w-6 h-6 text-sm hover:bg-amber-200 hover:text-amber-900 duration-100" color="#c7d2fe"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </form>

              </div>
            </div>
          )}
          {requestFromBand.map((band) =>

            <div className="nav-band-button pb-5">
              <div className="text-center truncate text-emerald-400" key={band.id}>

                <Link to={`/band/${band.id}`}>
                  <img className="profil-relation-image border-4 border-emerald-400"
                    src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${band.imageName}`} alt={band.name} title={`${band.name}`}></img>
                  <p className="text-sm">{band.name}</p>
                </Link>
              </div>
              <div className="notif-button w-full m-auto flex flex-row justify-around mt-1">
                <form
                  method="PATCH"
                  index-band-data={band.name}
                  onSubmit={(event) => submitBand(band, event)}>
                  <button type="submit" className="text-emerald-400 border-2 border-emerald-200 rounded-full flex items-center justify-center w-6 h-6 text-sm hover:bg-emerald-200 hover:text-emerald-900 duration-100" color="#c7d2fe"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </form>

                <form
                  method="DELETE"
                  index-band-data={band.name}
                  onSubmit={(event) => removeBand(band, event)}>
                  <button type="submit" className="text-amber-400 border-2 border-amber-200 rounded-full flex items-center justify-center w-6 h-6 text-sm hover:bg-amber-200 hover:text-amber-900 duration-100" color="#c7d2fe"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </form>

              </div>
            </div>
          )}
        </div>
      </li>
      <li className='li-icon'>
        <NavLink to={`/profil/${idValue}`}>
          <FontAwesomeIcon icon={faUserLarge} className="icon" color="#c7d2fe" />
        </NavLink>
      </li>
      <li className='li-icon-list' >
        <button className='w-10' onClick={handleBandIconToggle}>
          <FontAwesomeIcon icon={faPeopleGroup} className={isBandIconActive ? "text-emerald-500 icon" : "icon"} />
        </button>
        <div className={isBandIconActive ? "block li-band-list" : "hidden"}>
          {userBand.map((band) =>
            <Link to={`/band/${band.id}`}>
              <div className="nav-band-button">
                <div className="text-center truncate text-emerald-400" key={band.id}>
                  <img className="profil-relation-image border-4 border-emerald-400"
                    src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${band.imageName}`} alt={band.name} title={`${band.name}`}></img>
                  <p className="text-sm">{band.name}</p>
                </div>
              </div>
            </Link>
          )}
          <div className='.band-create-button-container'>
            <BandCreationButton />
          </div>
        </div>
      </li>
      <li className='li-icon'>
        <NavLink to={"/search"}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" color="#c7d2fe" />
        </NavLink>
      </li>
    </ul>
  );
}

export default NavBarIcon;