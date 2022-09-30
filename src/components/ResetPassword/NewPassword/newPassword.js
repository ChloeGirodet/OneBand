import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const NewPassword = () => {

  const slug = useParams();
  const [userPassword, setUserPassword] = useState('');

  const url = `http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/reset-password`;

  let navigate = useNavigate();

  function submit(event) {
    const userData = {
      password: userPassword,
      reset_token: slug.slug,
    };
    console.log(userData);
    event.preventDefault();
    axios.post(url, userData, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/connexion", { replace: true })
      })
      .catch((error) => {
        console.log(error);
        toast.error('Une erreur est survenue, merci de vérifier le mot de passe saisi.');
      });
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <p className="text-center text-3xl tracking-tight font-bold text-emerald-500">Votre nouveau mot de passe sur OneBand</p>
        </div>

        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={(event) => submit(event)}
        >
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">Nouveau mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-emerald-300 placeholder-emerald-500 text-emerald-500 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Nouveau mot de passe"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              >
              </input>
            </div>
          </div>
          <p className="text-sm font-medium text-center text-amber-300">Le mot de passe doit contenir minimum 8 caractères, dont au moins 1 majuscule, 1 minuscule et 1 chiffre.</p>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;