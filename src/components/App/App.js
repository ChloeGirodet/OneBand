import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/user';
import { Toaster } from 'react-hot-toast';

import './App.scss';

import BandCreation from '../BandCreation/bandCreation';
import BandProfile from '../BandProfile/bandProfile';
import Contact from '../Contact/contact';
import Footer from '../Footer/footer';
import ForgotPassword from '../ResetPassword/ForgotPassword/forgotPassword';
import Header from "../Header/header";
import Home from '../Home/home';
import Legal from '../Legal/legal';
import Login from '../Login/login';
import NewPassword from '../ResetPassword/NewPassword/newPassword';
import NotFound from '../NotFound/notFound';
import StepOne from '../SignUpForms/StepOne/stepOne';
import StepTwo from '../SignUpForms/StepTwo/stepTwo';
import StepThree from '../SignUpForms/StepThree/stepThree';
import Search from '../Search/Search';
import UserProfile from '../UserProfile/userProfile';

function App() {
  const location = useLocation();
  const isLogged = useSelector((state) => state.user.isLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      dispatch(setUser(loggedUser.userId, loggedUser.username, loggedUser.token));
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 5000,
          style: {
            padding: '20px',
          },
          success: {
            style: {
              background: '#b6f8c4',
            },
          },
          error: {
            style: {
              background: '#fcd34d',
            },
          },
        }}
      />
      <div className="App bg-slate-800 max-h-4/5 overflow-hidden">
        <Header />

        <Routes>
          <Route path="/inscription" element={<StepOne />} />
          <Route path="/inscription-2" element={<StepTwo />} />
          <Route path="/inscription-3" element={<StepThree />} />
          <Route path="/search" element={<Search />}></Route>
          <Route path="/connexion" element={<Login />} />

          <Route path="/recuperation-mot-de-passe" element={<ForgotPassword />} />
          <Route path="/nouveau-mot-de-passe/:slug" element={<NewPassword />} />

          {!isLogged && <Route path="/" element={<Home />} />}
          {isLogged && <Route path="/" element={<UserProfile />} />}

          <Route path="/profil/:slug" element={<UserProfile />} />
          <Route path="/search" element={<Search />}></Route>

          {isLogged && <Route path="/band-creation" element={<BandCreation />} />}

          <Route path="/band/:slug" element={<BandProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/CGU" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;