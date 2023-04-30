import axios from "axios";
// https://cuckoo-next.vercel.app/
// http://localhost:3000
const LOCAL_URL = process.env.NEXT_LOCAL_URL;
const BASE_URL = process.env.NEXT_BASE_URL;
export const api = axios.create({
  baseURL: LOCAL_URL || BASE_URL,
});
