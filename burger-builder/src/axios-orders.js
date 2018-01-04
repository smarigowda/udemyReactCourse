import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-43a92.firebaseio.com/'
});

export default instance;