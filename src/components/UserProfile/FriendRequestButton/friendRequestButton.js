/* eslint-disable */
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function FriendRequestButton({ requestData, slug, sendRequestData, userData }) {

  const [isFriend, setIsFriend] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  let idValue = null;
  if (loggedUser) {
    idValue = loggedUser.userId;
  }
  let navigate = useNavigate();

  useEffect(() => {
    requestData.map((dataUserFriends) => {
      if (dataUserFriends.id === slug) {
        setIsFriend(true);
      }
    })
    sendRequestData.map((sendData) => {
      if (sendData.id === slug) {
        setIsSend(true);
      }
    })
  }, [slug]);

  // --------------------------- Button Send Friend Request

  const urlSend = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/send-friend-request';

  const submit = function submit(event) {
    const Data = {
      user_request_from_id: idValue,
      user_request_to_id: userData.id,
    };
    event.preventDefault();
    axios.post(urlSend, Data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success('Votre demande d\'ajout en ami a été envoyée.');
      })
      .catch((error) => {
        console.log(error);
        toast.success('Votre demande d\'ajout en ami a été envoyée.');
      });
  }

  // --------------------------------------------------------------------- 

  return (
    <div>
      {!isFriend && !isSend && (idValue !== slug)
        ? <form className="user-option mx-auto sm:ml-auto sm:mr-0"
          method="POST"
          onSubmit={(event) => submit(event)}
        >
          <button className="friend-button" type="submit"
            onClick={() => {
              navigate(`/profil/${userData.id}`, { replace: true });
            }}
          >+</button>
        </form>
        : isSend && (idValue !== slug) ?
          <div className="friend-button">
            <span className='p-5 text-xs'>Requête envoyée</span>
          </div>
          : (idValue !== slug) ? <div className="friend-button">
            <span>Amis</span>
          </div>
            : <div></div>
      }
    </div>
  );
}

export default FriendRequestButton;