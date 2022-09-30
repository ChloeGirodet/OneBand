import axios from 'axios';
import { LOGIN, LOGOUT, setUser } from '../actions/user';
import toast from 'react-hot-toast';

const userMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    case LOGIN:
      // Get email and password values from store
      axios.post(
        'http://lbrqt-server.eddi.cloud/projet-one-band-back/public/api/login',
        {
          email: store.getState().user.changeInputEmail,
          password: store.getState().user.changeInputPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
        .then((response) => {
          const { userId, username, token } = response.data;
          localStorage.setItem('user', JSON.stringify({
            userId,
            username,
            token,
          }));
          store.dispatch(setUser(userId, username, token));
        })
        .catch((error) => {
          console.log(error);
          toast.error('Une erreur est survenue, essayez de vous reconnecter.');
        });

      break;

    case LOGOUT:
      localStorage.removeItem('user');
      toast.success('Merci pour la visite, à bientôt');
      next(action);
      break;

    default:
      next(action);
  }
};

export default userMiddleware;