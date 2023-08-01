import Cookies from "js-cookie";
export default {
  user: localStorage.getItem("user") || null,
  token: Cookies.get("token") || null,
};
