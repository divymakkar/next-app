import { Cookies } from "react-cookie";

const cookies = new Cookies();

const destroySession = () => {
  const cookie = new Cookies();
  cookie.remove("th_token", { path: "/" });
  cookie.remove("th_email", { path: "/" });
};

export { cookies, destroySession };
