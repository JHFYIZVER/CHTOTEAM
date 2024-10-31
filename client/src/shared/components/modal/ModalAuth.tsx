import modalType from "../../../@types/modalType";
import formType from "../../../@types/formType";
import useDebounce from "../../../hooks/useDebounce";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Login from "../login/Login";
import Register from "../register/Register";

const ModalAuth = observer(({ isOpen, setIsOpen }: modalType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<formType>();
  const [isRegister, setIsRegister] = useState(true);

  const clazz: string =
    "max-w-[400px] w-full text-center bg-input font-bold text-white py-3 outline-none rounded-bigBtn";

  const [formData, setFormData] = useState<formType>({} as formType);
  const debouncedData = useDebounce(formData, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(debouncedData);
  }, [debouncedData]);

  const submit: SubmitHandler<formType> = (data: formType) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<formType> = (errors) => {
    console.log(errors);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        clearErrors();
        reset();
        setIsOpen(false);
      }}
      transition
      className="fixed text-white inset-0 flex w-screen items-center justify-center bg-black/70 z-10 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel className="max-w-[460px] w-full space-y-4 bg-darkBlue p-12 rounded-[30px] relative">
        <DialogTitle className="font-bold text-xl flex items-center gap-5">
          <span
            className={isRegister ? "border-b" : ""}
            onClick={() => {
              clearErrors();
              reset();
              setIsRegister(true);
            }}
          >
            Регистрация
          </span>
          <span
            className={!isRegister ? "border-b" : ""}
            onClick={() => {
              clearErrors();
              reset();
              setIsRegister(false);
            }}
          >
            Вход
          </span>
        </DialogTitle>
        {isRegister ? <Register /> : <Login />}
        <svg
          onClick={() => {
            clearErrors();
            reset();
            setIsOpen(false);
          }}
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

export default ModalAuth;
