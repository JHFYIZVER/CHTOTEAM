import { useEffect, useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { loginFormType } from "../../../@types/formType";
import useDebounce from "../../../hooks/useDebounce";

const Login = () => {
  const [formData, setFormData] = useState<loginFormType>({} as loginFormType);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>();
  const clazz: string =
    "max-w-[400px] w-full text-center bg-input font-bold text-white py-3 outline-none rounded-bigBtn";

  const debouncedData = useDebounce(formData, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(debouncedData);
  }, [debouncedData]);

  const submit: SubmitHandler<loginFormType> = (data: loginFormType) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<loginFormType> = (errors) => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(submit, error)}
      className="flex flex-col gap-4"
    >
      <label className="relative">
        <input
          className={
            errors.email ? clazz + " border border-red-500 shake" : clazz
          }
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          aria-invalid={errors.email ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.email ? "error-active" : "error"}></span>
      </label>
      <label className="relative">
        <input
          className={
            errors.password ? clazz + " border border-red-500 shake" : clazz
          }
          type="password"
          placeholder="Пароль"
          autoComplete="off"
          {...register("password", { required: true, minLength: 6 })}
          aria-invalid={errors.password ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.password ? "error-active" : "error"}></span>
      </label>
      <button
        type="submit"
        className="rounded-smallBtn bg-blue w-full flex items-center justify-center font-bold py-3"
      >
        Вход
      </button>
    </form>
  );
};

export default Login;
