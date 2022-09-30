import { CHANGE_INPUT_EMAIL, CHANGE_INPUT_PASSWORD, LOGOUT, ERROR_CODE, SET_USER } from '../actions/user';

export const initialState = {
  isLogged: false,
  pseudo: '',
  token: '',
  changeInputEmail: '',
  changeInputPassword: '',
  errorCode: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_INPUT_EMAIL:
      return {
        ...state,
        changeInputEmail: action.value,
      };

    case CHANGE_INPUT_PASSWORD:
      return {
        ...state,
        changeInputPassword: action.value,
      };

    case SET_USER:
      return {
        ...state,
        isLogged: true,
        pseudo: action.pseudo,
        token: action.token,
      };

    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        pseudo: '',
        token: '',
      };

    case ERROR_CODE:
      return {
        ...state,
        errorCode: action.errorCode,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;