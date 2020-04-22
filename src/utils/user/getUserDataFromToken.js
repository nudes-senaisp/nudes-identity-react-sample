import jwtDecode from 'jwt-decode';

const getUserDataFromToken = (token) => {
  if (!token) return null;

  let decodedToken;

  try {
    decodedToken = jwtDecode(token);
  } catch (err) {
    return null;
  }

  return decodedToken;
};

export default getUserDataFromToken;
