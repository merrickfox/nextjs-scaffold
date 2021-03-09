import jwt_decode from "jwt-decode";

interface tokens {
  accessToken: string
  refreshToken: string
}

interface parsedToken {
  [name: string]: string
}

export const storeJwt = (tokens: tokens):void => {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export const parseJwt = (token: string): parsedToken => {
  return jwt_decode(token);
}

export const getUserFromToken = (): parsedToken | undefined => {
  const token = localStorage.getItem('accessToken');
  if (!token) return undefined;
  return parseJwt(token);
}
