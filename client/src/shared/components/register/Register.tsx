import useDebounce from "../../../hooks/useDebounce";
import { registerFormType } from "../../../@types/formType";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Register = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormType>();

  const clazz: string =
    "max-w-[400px] w-full text-center bg-input font-bold text-white py-3 outline-none rounded-bigBtn";

  const [formData, setFormData] = useState<registerFormType>({} as registerFormType);
  const debouncedData = useDebounce(formData, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData(debouncedData);
  }, [debouncedData]);

  const submit: SubmitHandler<registerFormType> = (data: registerFormType) => {
    console.log(data);
  };

  const error: SubmitErrorHandler<registerFormType> = (errors) => {
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
            errors.name ? clazz + " border border-red-500 shake" : clazz
          }
          type="text"
          placeholder="Имя"
          autoComplete="off"
          {...register("name", { required: true })}
          aria-invalid={errors.name ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.name ? "error-active" : "error"}></span>
      </label>
      <label className="relative">
        <input
          className={
            errors.surname ? clazz + " border border-red-500 shake" : clazz
          }
          type="text"
          placeholder="Фамилия"
          autoComplete="off"
          {...register("surname", { required: true })}
          aria-invalid={errors.surname ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.surname ? "error-active" : "error"}></span>
      </label>
      <label className="relative">
        <input
          className={
            errors.email ? clazz + " border border-red-500 shake" : clazz
          }
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          aria-invalid={errors.email ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.email ? "error-active" : "error"}></span>
      </label>
      <label className="relative">
        <input
          className={
            errors.data ? clazz + " border border-red-500 shake" : clazz
          }
          type="date"
          placeholder="Дата рождения"
          autoComplete="off"
          {...register("data", { required: true })}
          aria-invalid={errors.data ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.data ? "error-active" : "error"}></span>
      </label>
      <label className="relative">
        <input
          className={
            errors.password ? clazz + " border border-red-500 shake" : clazz
          }
          type="password"
          placeholder="Пароль"
          autoComplete="off"
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
          onChange={onChange}
        />
        <span className={errors.password ? "error-active" : "error"}></span>
      </label>
      <button
        type="submit"
        className="rounded-smallBtn bg-blue w-full flex items-center justify-center font-bold py-3"
      >
        Регистрация
      </button>
    </form>
  );
});

export default Register;
