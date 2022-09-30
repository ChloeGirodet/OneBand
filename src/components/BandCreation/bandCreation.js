import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

function BandCreation() {

  const schema = yup
    .object({
      band_name: yup
        .string()
        .max(50)
        .required('Merci de saisir le nom du groupe'),
      band_description: yup
        .string()
        .max(500, 'La description ne peut pas dépasser 500 caractères'),
      band_location: yup
        .string()
        .max(40, 'La ville ne peut pas dépasser 40 caractères')
        .required('Merci de saisir votre localisation'),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [bandName, setBandName] = useState('');
  const [bandDescription, setBandDescription] = useState('');
  const [bandLocation, setBandLocation] = useState('');
  const [bandPicture, setBandPicture] = useState('');
  const [bandGenres, setBandGenres] = useState([]);
  const [bandInstruments, setBandInstruments] = useState([]);
  const [genreId, getGenreId] = useState('');
  const [instrumentId, getInstrumentId] = useState('');

  let navigate = useNavigate();

  const isLogged = useSelector((state) => state.user.isLogged);
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  let idValue = 0;
  if (isLogged) {
      idValue = loggedUser.userId;
  };
  
  let bandOwnerId = null;
  if (loggedUser) {
    bandOwnerId = loggedUser.userId;
  };

  let userToken = null;
  if (loggedUser) {
    userToken = loggedUser.token;
  };

  function getGenresId() {
    axios.get('http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/genre')
      .then((response) => {
        getGenreId(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

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

  // To convert upload image to Base64
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBandPicture(base64);
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

  // To return genres ID in array of objects to API
  function handleBandGenres(value) {
    setBandGenres([...bandGenres, { id: value }]);
  };

  // To return instruments ID in array of objects to API
  function handleBandInstruments(value) {
    setBandInstruments([...bandInstruments, { id: value }]);
    console.log(bandInstruments);
  };

  const url = 'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/band/create';

  function submit() {
    const bandData = {
      name: bandName,
      description: bandDescription,
      user_owner: bandOwnerId,
      image_name: bandPicture,
      location: bandLocation,
      genre_id: bandGenres,
      instrument_id: bandInstruments,
    };
    console.log(bandData);
    axios.defaults.headers.common.Authorization = `bearer ${userToken}`;
    axios.post(url, bandData, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);
        toast.success('Votre groupe est créé.');
        navigate(`../profil/${idValue}`, { replace: true })
      })
      .catch((error) => {
        console.log(error);
        toast.error('Une erreur est survenue, merci de revérifier la saisie du formulaire.');
      });
  }

  return (
    <div className="band-creation-container min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="band-creation-title text-center text-3xl tracking-tight font-bold text-emerald-400">Créer un groupe</h2>
        </div>

        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={(handleSubmit(submit))}
        >

          <input
            className="band-creation-name appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-400 placeholder-emerald-400 text-slate-800 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            id="band_name"
            name="band_name"
            {...register('band_name')}
            placeholder="Nom du groupe"
            type="text"
            value={bandName}
            onChange={(event) => setBandName(event.target.value)}
          />
          {errors.band_name && <p id="c-yup">{errors.band_name.message}</p>}

          <input
            className="band-creation-location appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-400 placeholder-emerald-400 text-slate-800 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
            id="band_location"
            name="band_location"
            {...register('band_location')}
            placeholder="Ville du groupe"
            type="text"
            value={bandLocation}
            onChange={(event) => setBandLocation(event.target.value)}
          />
          {errors.band_location && <p id="c-yup">{errors.band_location.message}</p>}

          {bandPicture ? (
            <img src={bandPicture} alt="" />
          ) : (
            <input
              className="add-profil-image"
              id="band_picture"
              name="band_picture"
              placeholder="Image de profil"
              type="file"
              value={bandPicture}
              onChange={(event) => uploadImage(event)}
            />
          )}

          <h2 className="band-creation-style text-sm font-medium font-bold text-emerald-400 dark:text-emerald-400 text-left">Style musical</h2>
          <div className="grid grid-cols-2 place-content-between">
            {genreId ? genreId.map((genre) => (
              <div key={genre.id} className="flex items-center mb-4">
                <input id="default-checkbox" type="checkbox" value={genre.id}
                  onChange={(event) => handleBandGenres(event.target.value)}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 rounded border-gray-300 focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-emerald-200 dark:text-gray-300">{genre.name}</label>
                <input id="checkbox" type="hidden" value="0"></input>
                <label htmlFor="default-checkbox"></label>
              </div>
            ))
              : null
            }
          </div>

          <h2 className="band-creation-style text-sm font-medium font-bold text-emerald-400 dark:text-emerald-300 text-left">Instruments</h2>
          <div className="grid grid-cols-2 place-content-between">
            {instrumentId ? instrumentId.map((instrument) => (
              <div key={instrument.id} className="flex items-center mb-4">
                <input id="default-checkbox" type="checkbox" value={instrument.id}
                  onChange={(event) => handleBandInstruments(event.target.value)}
                  className="w-4 h-4 text-emerald-600 bg-emerald-100 rounded border-emerald-300 focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-emerald-800 focus:ring-2 dark:bg-emerald-700 dark:border-emerald-600"></input>
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-emerald-200 dark:text-emerald-300">{instrument.name}</label>
                <input id="checkbox" type="hidden" value="0"></input>
                <label htmlFor="default-checkbox"></label>
              </div>
            ))
              : null
            }
          </div>

          <h2 className="band-creation-style text-sm font-medium font-bold text-emerald-400 dark:text-emerald-400 text-left">Description du groupe</h2>
          <div className="band-creation-description col-span-full">
            <label htmlFor="text" className="sr-only">Description du groupe</label>
            <textarea name="band-description" id="band-description" cols="30" rows="4" autoFocus="autoFocus"
              placeholder="Description reprenant par exemple vos influences musicales, expérience, objectif professionnel ou amateur, compo ou reprises..."
              className="form-textarea resize-none appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-400 placeholder-slate-400 text-slate-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register('band_description')}
              value={bandDescription}
              onChange={(event) => setBandDescription(event.target.value)}
            ></textarea>
          </div>
          {errors.band_description && <p id="c-yup">{errors.band_description.message}</p>}

          <div>
            <button
              className="band-creation-button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              type="submit">
              Terminer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BandCreation;