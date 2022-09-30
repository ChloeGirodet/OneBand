import { useDispatch, useSelector } from 'react-redux';
import { changeInputEmail, changeInputPassword, logIn } from '../../actions/user';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Login = () => {

    const dispatch = useDispatch();
    const isLogged = useSelector((state) => state.user.isLogged);
    const emailValue = useSelector((state) => state.user.changeInputEmail);
    const passwordValue = useSelector((state) => state.user.changeInputPassword);

    const navigate = useNavigate();
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        let idValue = 0;
        if (isLogged) {
            idValue = loggedUser.userId;
        }
        isLogged && navigate(`../profil/${idValue}`, { replace: true })
    }, [isLogged, navigate]);

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 shadow-lg mt-20 p-10 shadow-slate-900/100 rounded-llg">
                <div>
                    <p className="text-center text-3xl tracking-tight font-bold text-emerald-300">Se connecter à OneBand</p>
                </div>

                <form
                    className="mt-8 space-y-6"
                    method="POST"
                    onSubmit={(event) => {
                        event.preventDefault();
                        dispatch(logIn());
                    }}
                >
                    <input type="hidden" name="remember" value="true"></input>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Adresse Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-emerald-500 focus:z-10 sm:text-sm"
                                placeholder="Adresse Email"
                                value={emailValue}
                                onChange={(event) => {
                                    dispatch(changeInputEmail(event.target.value));
                                }}
                            >
                            </input>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-emerald-500 focus:z-10 sm:text-sm"
                                placeholder="Mot de passe"
                                value={passwordValue}
                                onChange={(event) => {
                                    dispatch(changeInputPassword(event.target.value));
                                }}
                            >
                            </input>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm">
                            <Link to="/recuperation-mot-de-passe" className="font-medium text-amber-300 hover:text-amber-500"> Mot de passe oublié ?</Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm text-amber-100 font-medium rounded-md text-white bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-amber-500 group-hover:text-amber-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Connexion
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/inscription" className="font-medium hover:text-amber-500  text-amber-300">Créer mon compte</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;