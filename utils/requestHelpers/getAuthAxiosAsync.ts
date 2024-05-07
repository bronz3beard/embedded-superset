import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { assertIsTrue } from '../valueCheckers';

// creating the axios allows us to request cross origin to a separate BE.
// If we need to make requests to 3rd party apis we can use the standard axios instance.
const makeAuthAxios = async () => {
  // Some docs: https://github.com/auth0/express-jwt
  return Axios.create({ withCredentials: true });
};

const getAuthAxiosAsync = async (): Promise<AxiosInstance> => {
  const instance: AxiosInstance = await makeAuthAxios();

  assertIsTrue(instance !== undefined);

  instance.interceptors.response.use(
    (result: AxiosResponse) => {
      return result;
    },

    (error) => {
      const { response } = error;

      if (response) {
        if (response.status === 400) {
          console.error('Bad Request!');
        }

        if (response.status === 404) {
          console.error('Not Found!');
        }

        if (response.status === 401) {
          console.error('Unauthorised!');
        }
        if (response.status === 403) {
          console.error('Permission Denied: Computer says no!');
        }
      } else {
        console.error('Unexpected Error occurred!');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default getAuthAxiosAsync;
