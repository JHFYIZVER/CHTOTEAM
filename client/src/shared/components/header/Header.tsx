import { useContext } from "react";
import logo from "../../../../public/logo.svg";
import "./header.css";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
const Header = observer(() => {
  const { aside }: any = useContext(Context);
  const clazz: string =
    "header bg-blue text-white fixed w-full z-10 transition-all ease-in-out duration-200";

  return (
    <header className={aside.isOpen ? clazz + " mx-[300px]" : clazz}>
      <div className="header-wrapper flex max-w-xxl w-full mx-auto px-35 py-4">
        <div className="logo flex">
          <button
            onClick={() => aside.setIsOpen(!aside.isOpen)}
            className={
              aside.isOpen
                ? "burger-open w-[35px] min-h-[35px]"
                : "burger w-[35px] min-h-[35px]"
            }
          >
            <span className="bg-white w-3"></span>
            <span className="bg-white w-3"></span>
            <span className="bg-white w-3"></span>
          </button>
          <span className="flex items-center gap-4 font-bold ml-20">
            CTHOTEAM <img src={logo} alt="logo" />
          </span>
        </div>
        <input
          className="mx-auto border border-white/20 bg-blue rounded-smallBtn py-1 px-3 outline-none max-w-[440px] w-full"
          type="text"
          placeholder="Поиск"
        />
      </div>
    </header>
  );
});

export default Header;
