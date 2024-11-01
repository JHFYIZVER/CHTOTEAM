import storeImg from "./img/store.svg";
import profileImg from "./img/profile.svg";
import libraryImg from "./img/library.svg";
import homeImg from "./img/home.svg";
import { NavLink } from "react-router-dom";
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
  MAIN_ROUTE,
  PROFILE_ROUTE,
  LIBRARY_ROUTE,
  STORE_ROUTE,
} from "../../../../utils/const";
import "./asideNav.css";

const AsideNav = observer(() => {
  const { aside }: any = useContext(Context);
  const clazz: string =
    "aside-nav h-svh bg-aside max-w-[300px] w-full fixed text-white z-1";

  return (
    <aside
      onClick={() => (aside.isOpen = false)}
      className={aside.isOpen ? "bg" : ""}
    >
      <div className={aside.isOpen ? clazz + " aside-nav-open" : clazz}>
        <ul className="flex flex-col pt-[66px]">
          <NavLink
            to={MAIN_ROUTE}
            className="flex items-center gap-4 h-[60px] px-35 cursor-pointer"
          >
            <img src={homeImg} alt="icon" /> Главная
          </NavLink>
          <NavLink
            to={LIBRARY_ROUTE}
            className="flex items-center gap-4 h-[60px] px-35 cursor-pointer"
          >
            <img src={libraryImg} alt="icon" /> Библиотека
          </NavLink>
          <NavLink
            to={STORE_ROUTE}
            className="flex items-center gap-4 h-[60px] opacity-70 px-35 cursor-pointer"
          >
            <img src={storeImg} alt="icon" /> Магазин
          </NavLink>
          <NavLink
            to={PROFILE_ROUTE}
            className="flex items-center gap-4 h-[60px] opacity-70 px-35 cursor-pointer"
          >
            <img src={profileImg} alt="icon" /> Мой профиль
          </NavLink>
        </ul>
      </div>
    </aside>
  );
});

export default AsideNav;
