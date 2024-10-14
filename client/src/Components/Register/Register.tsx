import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { observer } from "mobx-react-lite";
import Input from "../UI/input";
import { useState } from "react";

type PropsType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Register = observer(({ isOpen, setIsOpen }: PropsType) => {
  const [name, setIsName] = useState("");
  const [surname, setIsSurname] = useState("");
  const [password, setIsPassword] = useState("");
  const [repeatPassword, setIsRepeatPassword] = useState("");
  const [data, setIsData] = useState("");
  const [email, setIsEmail] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed text-white inset-0 flex w-screen items-center justify-center bg-black/70 z-10 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-[460px] w-full space-y-4 bg-darkBlue p-12 rounded-[30px] relative">
        <DialogTitle className="font-bold text-xl flex items-center gap-5">
          <span
            onClick={() => setIsRegister(!isRegister)}
            className={
              !isRegister
                ? "border-b w-fit cursor-pointer"
                : "w-fit cursor-pointer"
            }
          >
            Вход
          </span>{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className={
              isRegister
                ? "border-b w-fit cursor-pointer"
                : "w-fit cursor-pointer"
            }
          >
            Регистрация
          </span>
        </DialogTitle>
        <form className="flex flex-col gap-4">
          {isRegister ? (
            <>
              <Input
                placeholder="Имя"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsName(e.target.value)
                }
                type="text"
              />
              <Input
                placeholder="Фамилия"
                type="text"
                value={surname}
                onChange={(e) => setIsSurname(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsEmail(e.target.value)
                }
                type="email"
              />
              <Input
                placeholder="Дата рождения"
                value={data}
                type="date"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsData(e.target.value)
                }
              />
              <Input
                placeholder="Пароль"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsPassword(e.target.value)
                }
                type="password"
              />
              <Input
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsRepeatPassword(e.target.value)
                }
                type="password"
              />
            </>
          ) : (
            <>
              <Input
                placeholder="Email"
                value={authEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAuthEmail(e.target.value)
                }
                type="email"
              />
              <Input
                placeholder="Пароль"
                value={authPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAuthPassword(e.target.value)
                }
                type="password"
              />
            </>
          )}
        </form>
        <button
          onClick={() => setIsOpen(false)}
          type="submit"
          className="rounded-smallBtn bg-blue w-full flex items-center justify-center font-bold py-3"
        >
          Регистрация
        </button>
        <svg
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 cursor-pointer"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.366161 25.1149C-0.121994 25.603 -0.121994 26.3945 0.366161 26.8826C0.854317 27.3708 1.64577 27.3708 2.13393 26.8826L13.6243 15.3923L25.1149 26.8828C25.603 27.371 26.3945 27.371 26.8826 26.8828C27.3708 26.3947 27.3708 25.6032 26.8826 25.1151L15.3921 13.6245L26.8827 2.13388C27.3708 1.64573 27.3708 0.854272 26.8827 0.366117C26.3945 -0.122039 25.6031 -0.122039 25.1149 0.366117L13.6243 11.8567L2.13388 0.366318C1.64573 -0.121837 0.854272 -0.121837 0.366117 0.366318C-0.122039 0.854474 -0.122039 1.64593 0.366117 2.13409L11.8565 13.6245L0.366161 25.1149Z"
            fill="white"
          />
        </svg>
      </DialogPanel>
    </Dialog>
  );
});

export default Register;
