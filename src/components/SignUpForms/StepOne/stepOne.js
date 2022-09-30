import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

import StepTwo from '../StepTwo/stepTwo';
import StepThree from '../StepThree/stepThree';

function StepOne() {
  const [userName, setUsername] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userGenres, setUserGenres] = useState('');
  const [userInstruments, setUserInstruments] = useState('');
  const [genreId, getGenreId] = useState('');
  const [instrumentId, getInstrumentId] = useState('');

  let navigate = useNavigate();

  // To get the list of the genres from the API
  function getGenresId() {
    axios.get('http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/genre')
      .then((response) => {
        getGenreId(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  // To get the list of the instruments from the API
  function getInstrumentsId() {
    axios.get('http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/instrument')
      .then((response) => {
        getInstrumentId(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    getGenresId();
    getInstrumentsId();
  }, []);

  // To return an array of objects to API
  function handleUSerGenres(value) {
    setUserGenres([...userGenres, { id: value }]);
  };

  // To return an array of objects to API
  function handleUserInstruments(value) {
    setUserInstruments([...userInstruments, { id: value }]);
  };

  // To convert upload image to Base64
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUserPicture(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const url = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/register';

  function submit(event) {
    const userData = {
      username: userName,
      location: userLocation,
      email: userEmail,
      password: userPassword,
      image_name: userPicture,
      description: userDescription,
      genreId: userGenres,
      instrumentId: userInstruments,
    };
    event.preventDefault();
    axios.post(url, userData, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success('Votre compte est créé ! Consultez vos emails pour le valider.');
        navigate("/connexion", { replace: true })
      })
      .catch((error) => {
        console.log(error);
        toast.error('Une erreur est survenue, merci de revérifier la saisie du formulaire.');
      });
  }

  return (
    <div className="signup-form-container min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="signup-form-title text-center text-3xl tracking-tight font-bold text-emerald-400">S'inscrire sur OneBand</h2>
        </div>

        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={(event) => submit(event)}
        >

          <input
            className="signup-form-pseudo appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            required
            id="user_username"
            name="user_username"
            placeholder="Pseudo"
            type="text"
            value={userName}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            className="signup-form-location appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            required
            id="user-location"
            name="user-location"
            placeholder="Ville"
            type="text"
            value={userLocation}
            onChange={(event) => setUserLocation(event.target.value)}
          />

          <input
            className="signup-form-email appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            required
            id="user-email"
            name="user-email"
            placeholder="Adresse Email"
            type="email"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            autoComplete="username"
          />

          <input
            className="signup-form-password appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            required
            id="user-password"
            name="user-password"
            placeholder="Mot de passe"
            type="password"
            value={userPassword}
            onChange={(event) => setUserPassword(event.target.value)}
            autoComplete="current-password"
          />
          <p className="text-sm font-medium text-center text-amber-300">Le mot de passe doit contenir minimum 8 caractères, dont au moins 1 majuscule, 1 minuscule et 1 chiffre.</p>

          {userPicture ? (
            <img src={userPicture} alt="" />
          ) : (
            <input
              className="add-profil-image"
              id="user-picture"
              name="user-picture"
              placeholder="Image de profil"
              type="file"
              value={userPicture}
              onChange={(event) => uploadImage(event)}
            />
          )}

          <StepTwo
            genreId={genreId} handler={handleUSerGenres}
          />

          <StepThree
            instrumentId={instrumentId} handler={handleUserInstruments}
          />

          <div className="band-creation-description col-span-full">
            <label htmlFor="text" className="sr-only">Description</label>
            <textarea name="band-description" id="band-description" cols="30" rows="4" autoFocus="autoFocus"
              placeholder="Description reprenant par exemple vos influences musicales, expérience, objectif professionnel ou amateur, compo ou reprises..."
              className="form-textarea resize-none appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={userDescription}
              onChange={(event) => setUserDescription(event.target.value)}
            ></textarea>
          </div>

          <div className="flex space-x-6 justify-center">
            <button
              className="signup-form-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit">
              Terminer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StepOne;