import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';

import Band from '../UserProfile/Band/band';
import BandCreationButton from './BandCreationButton/bandCreationButton';
import BandRequestButton from './BandRequestButton/bandRequestButton';
import FriendRequestButton from './FriendRequestButton/friendRequestButton';
import Friends from '../UserProfile/Friends/friends';
import Genres from '../BandProfile/Genres/genres';
import Instruments from '../BandProfile/Instruments/instruments';
import Loader from '../App/Loader/loader';
import LogoutButton from './LogoutButton/logoutButton';

function UserProfile() {

  const isLogged = useSelector((state) => state.user.isLogged);
  const { slug } = useParams();
  const [userData, setUserData] = useState();
  const [userFriends, setUserFriends] = useState([]);
  const [userBands, setUserBands] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [sendRequestData, setSendRequestData] = useState([]);
  const [ownerBand, setOwnerBand] = useState([]);
  const [load, setLoad] = useState(true);
  const [isAddToBandActive, setAddToBandActive] = useState(false);
  let navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  let idValue = null;
  let userToken = null;
  if (loggedUser) {
    idValue = loggedUser.userId;
    userToken = loggedUser.token;
  }

  useEffect(() => {
    if (idValue) {
      axios.defaults.headers.common.Authorization = `bearer ${userToken}`;
      axios.all([axios.get(`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/${idValue}/user-session`),
      axios.get(`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/${slug}`)])
        .then((response) => {
          setUserData(response[1].data.user_data);
          setUserFriends(response[1].data.user_friends);
          setUserBands(response[1].data.user_band);
          setRequestData(response[0].data.user_session.user_friends);
          setSendRequestData(response[0].data.user_session.user_friends_sent);
          setOwnerBand(response[0].data.user_session.user_band)
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            navigate("error", { replace: true });
          }
        });
    }
    else {
      axios.get(`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/${slug}`)
        .then((response) => {
          setUserData(response.data.user_data);
          setUserFriends(response.data.user_friends);
          setUserBands(response.data.user_band);
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            navigate("error", { replace: true });
          }
        });
    }
  }, [slug]);

  function handleAddToBandToggle() {
    setAddToBandActive(!isAddToBandActive);
  }

  if (load) {
    return <Loader />
  }
  return (
    <>
      <div className="profil-container mt-20">
        {isLogged && (idValue !== parseInt(slug)) &&
          <div className="add-to-band-container">
            <button className={isAddToBandActive ? "add-to-band-button bg-emerald-800 text-emerald-200" : "add-to-band-button"} onClick={handleAddToBandToggle}>
              Ajouter à un groupe
            </button>
            <div className={isAddToBandActive ? "add-to-band-list" : "hidden"}>
              <div>
                <BandRequestButton ownerBand={ownerBand} slug={parseInt(slug)} userData={userData} userBands={userBands} />
              </div>
            </div>
          </div>
        }

        <div className="profil-header">
          <div className="profil-header-left">
            <img className="profil-image" src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${userData.imageName}`} alt="userImage" />
            <h1 className="profil-username mt-2">{userData.username}</h1>
            <h2 className="text-slate-200 text-xs mt-1">{userData.location}</h2>
            {isLogged &&
              <p className="text-slate-200 text-xs mt-1">{userData.email}</p>
            }
            {isLogged && <FriendRequestButton requestData={requestData} slug={parseInt(slug)} sendRequestData={sendRequestData} userData={userData} />}

          </div>
          <div className="profil-header-center mt-5 overscroll-contain">
            <h2 className="text-xl text-amber-400"> Description </h2>
            <p className="p-4 text-sm text-slate-200">{userData.description}</p>
          </div>
          <div className="profil-header-right">
            <div className="overflow-y-auto pb-3 tablet:pb-0">
              <span className="text-amber-400 text-xl">Styles</span>
              <Genres key={userData.genres} genres={userData.genres} />
            </div>
            <div className="overflow-y-auto">
              <span className="text-amber-400 text-xl">Instruments</span>
              <Instruments key={userData.instruments} instruments={userData.instruments} />
            </div>
          </div>
        </div>
        <div className="profil-body">
          <div className="profil-relation-container">
            <div className="relation-container">
              <h2 className="text-xl font-bold text-emerald-400 p-5"> Groupes </h2>
              <div className="relation-list">
                <Band key={userBands.name} userBands={userBands} />
                <div className="band-create-button-container w-full">
                  {isLogged && (idValue === parseInt(slug)) && <BandCreationButton />}
                </div>
              </div>
            </div>
            <div className="relation-container">
              <h2 className="text-xl font-bold text-amber-400 p-5"> Contacts </h2>
              <div className="relation-list">
                <Friends key={userFriends.username} userFriends={userFriends} />
              </div>
            </div>
          </div>
        </div>

        <div className="logout-button">
          {isLogged && (idValue === parseInt(slug)) && <LogoutButton />}
        </div>
      </div>
    </>
  );
};

export default UserProfile;