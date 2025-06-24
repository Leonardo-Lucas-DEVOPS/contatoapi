import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7239', // Troque para a URL da sua API .NET 6
});

export default api;
