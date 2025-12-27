import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const http = axios.create({
  baseURL: baseURL || '', // אם אין env, אפשר לעבוד ב-mock בלי להשתמש בזה
});
