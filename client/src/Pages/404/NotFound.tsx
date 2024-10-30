import { NavLink } from "react-router-dom";
import notFound from "./amico.png";
import useTitle from "../../hooks/useTitle";

const NotFound = () => {
  useTitle("404");
  return (
    <main className="flex items-center justify-center h-svh mx-auto mr-[300px]">
      <div className="text-white max-w-[600px] font-bold">
        <h1 className="text-7xl">Ooops...</h1>
        <h2 className="text-7xl pb-10">Page not found</h2>
        <p className="pb-10">
          Страница, которую вы ищете, не существует или произошла какая-либо
          другая ошибка, вернитесь на главную страницу.
        </p>
        <NavLink className="bg-dark py-4 px-8 rounded text-white" to="/">
          На главную
        </NavLink>
      </div>
      <img src={notFound} alt="" />
    </main>
  );
};

export default NotFound;
