export const CHANGE_INPUT_EMAIL = 'CHANGE_INPUT_EMAIL';
export const changeInputEmail = (changeInputEmail) => ({
  type: CHANGE_INPUT_EMAIL,
  value: changeInputEmail,
});

export const CHANGE_INPUT_PASSWORD = 'CHANGE_INPUT_PASSWORD';
export const changeInputPassword = (changeInputPassword) => ({
  type: CHANGE_INPUT_PASSWORD,
  value: changeInputPassword,
});

export const LOGIN = 'LOGIN';
export const logIn = () => ({
  type: LOGIN,
});

export const LOGOUT = 'LOGOUT';
export const logOut = () => ({
  type: LOGOUT,
  logged: false,
  pseudo: '',
  token: '',
});

export const SET_USER = 'SET_USER';
export const setUser = (email, token) => ({
  type: SET_USER,
  email: email,
  token: token,
});

export const ERROR_CODE = 'ERROR_CODE';
export const errorCode = (errorCode) => ({
  type: ERROR_CODE,
  errorCode: errorCode,
});
