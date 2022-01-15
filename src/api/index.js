import axios from "axios";

export const publicBackend = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
      'Content-Type': 'application/json',
  }
});

export const privateBackend = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization:'Bearer '+JSON.parse(localStorage.getItem('auth')),
  },
});


privateBackend.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('auth'));

  if (token) {
      req.headers.Authorization = `Bearer ${token}`;
  }

  // if (store.getState().auth.isAuthenticated)
      return req

});