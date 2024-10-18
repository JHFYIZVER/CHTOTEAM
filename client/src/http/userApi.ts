import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (
  name: string,
  surname: string,
  dataBirth: Date,
  email: string,
  password: string | number
) => {
  const { data } = await $host.post("api/user/registration", {
    name,
    surname,
    email,
    dataBirth,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (
  email: string | number,
  password: string | number
) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
