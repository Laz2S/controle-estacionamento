import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://parking-lot-to-pfz.herokuapp.com/parking',
});

export default instance;