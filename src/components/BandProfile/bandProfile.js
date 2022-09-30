import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Genres from './Genres/genres';
import Instruments from './Instruments/instruments';
import Loader from '../App/Loader/loader'
import Members from './Members/members';

function BandProfile() {
  const { slug } = useParams();
  const [bandData, setBandData] = useState();
  const [bandsMembers, setBandsMembers] = useState();
  const [load, setLoad] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/band/${slug}`)
      .then((response) => {
        setBandData(response.data.band_data);
        setBandsMembers(response.data.band_members);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          console.log("erreur");
          navigate("error", { replace: true });
        }
      })
  }, [slug, navigate]);

  if (load) {
    return <Loader />;
  }
  return (
    <>
      <div className="profil-container mt-10">
        <div className="profil-header  bg-slate-800">
          <div className="profil-header-left">
            <img className="profil-image border-emerald-400" src={`http://lbrqt-server.eddi.cloud/projet-one-band-back/public/${bandData.imageName}`} alt="band" />
            <h1 className="profil-username text-emerald-400">{bandData.name}</h1>
            <h2 className="text-emerald-200 text-base">{bandData.location}</h2>
          </div>

          <div className="profil-header-center mt-5 overscroll-contain">
            <h2 className="text-xl text-emerald-400">Description du groupe</h2>
            <p className="p-4 text-sm text-slate-200">{bandData.description}</p>
          </div>
          <div className="profil-header-right">
            <div className="overflow-y-auto">
              <span className="text-emerald-400 text-xl pb-1">Styles</span>
              <Genres
                key={bandData.genres} genres={bandData.genres}
              />
            </div>
            <div className="overflow-y-auto">
              <span className="text-emerald-400 text-xl pb-1">Instruments</span>
              <Instruments
                instruments={bandData.instruments}
              />
            </div>
          </div>
        </div>
        <div className="profil-relation mt-10">
          <div className="friend-container">
            <span className="text-xl p-5">Membres du groupe</span>
            <Members key={bandsMembers.username} bandsMembers={bandsMembers} />
          </div>
        </div>

      </div>
    </>
  );
};

export default BandProfile;