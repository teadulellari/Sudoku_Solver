
import axios from 'axios';

const API = axios.create({ baseUrl: 'http://localhost:5000' });



export const createSudoku = ({gridVal}) => API.post('/', {gridVal});
export const checkSudoku = ({gridVal}) => API.post('/check', {gridVal});

