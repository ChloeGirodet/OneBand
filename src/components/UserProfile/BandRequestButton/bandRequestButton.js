/* eslint-disable */
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function BandRequestButton({ slug, userData, ownerBand, userBands }) {

  const [isMyBand, setIsMyBand] = useState(false);
  const [myBandId, setMyBandId] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  let idValue = null;
  if (loggedUser) {
    idValue = loggedUser.userId;
  }
  let navigate = useNavigate();

  let mac = [];
  useEffect(() => {
    ownerBand.map((allbands) => {
      if (allbands.userOwner.id === idValue) {
        setIsMyBand(true);
        mac.push(allbands);
      }
    })
    setMyBandId(mac);
  }, [slug]);

  // --------------------------- Button Send Band Request

  const urlSend = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/user/send-band-request';

  const submit = function submit(event, band) {
    const Data = {
      band_member_request_from_id: band.id,
      band_member_request_to_id: userData.id,
      user_session_id: idValue,
    };
    event.preventDefault();
    axios.post(urlSend, Data, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success('Votre demande d\'ajout a été envoyée.');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Une demande d\'ajout a déjà été envoyée.');
      });
  }

  // ---------------------------------------------------------------------

  return (
    <div>
      {isMyBand
        ? myBandId.map((band) =>
          <form method="POST"
            onSubmit={(event) => submit(event, band)} >
            <button className="nav-band-button" type='submit'>
              <div className="text-center truncate text-emerald-400" key={band.id}>
                <img className="profil-relation-image border-4 border-emerald-400 hover:rotate-12 duration-75"
                  src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${band.imageName}`} alt="band-picture" title={`${band.name}`}></img>
                <p className="text-sm">{band.name}</p>
              </div>
            </button>
          </form>
        )
        : <div>non</div>}
    </div>
  );
}

export default BandRequestButton;