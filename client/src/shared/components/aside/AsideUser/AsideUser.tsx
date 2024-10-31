import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../../../main";
import ModalAuth from "../../modal/ModalAuth";

const AsideUser = observer(() => {
  const { modal }: any = useContext(Context);
  return (
    <>
      <aside className="h-svh bg-blue mt-[66px] border-l border-[#41435A] max-w-[240px] w-full fixed z-10 top-0 right-0 text-white flex flex-col items-center pt-35 px-4">
        <div className="flex flex-col items-center">
          <div className="w-[124px] h-[124px] rounded-full bg-black"></div>
          <h2 className="font-bold text-lg">Sophie Fortune</h2>
          <button
            onClick={() => modal.setIsOpen(true)}
            className="rounded-smallBtn"
          >
            Войти
          </button>
        </div>
        <div className="friends mt-10 flex flex-col items-center w-full">
          <div className="flex items-center gap-5 justify-around w-full text-white/30">
            <span>Friends</span>
            <span>See all</span>
          </div>
          <div className="h-full w-full mt-8">
            <ul className="flex flex-col gap-[8px] w-full">
              <li className="bg-white/30 rounded-smallBtn w-full flex items-center gap-4 h-[60px] px-3">
                <div className="bg-black w-[30px] h-[30px] rounded-full"></div>
                Anne Couture
              </li>
              <li className="bg-white/30 rounded-smallBtn w-full flex items-center gap-4 h-[60px] px-3">
                <div className="bg-black w-[30px] h-[30px] rounded-full"></div>
                Anne Couture
              </li>
              <li className="bg-white/30 rounded-smallBtn w-full flex items-center gap-4 h-[60px] px-3">
                <div className="bg-black w-[30px] h-[30px] rounded-full"></div>
                Anne Couture
              </li>
              <li className="bg-white/30 rounded-smallBtn w-full flex items-center gap-4 h-[60px] px-3">
                <div className="bg-black w-[30px] h-[30px] rounded-full"></div>
                Anne Couture
              </li>
              <li className="bg-white/30 rounded-smallBtn w-full flex items-center gap-4 h-[60px] px-3">
                <div className="bg-black w-[30px] h-[30px] rounded-full"></div>
                Anne Couture
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <ModalAuth isOpen={modal.isOpen} setIsOpen={modal.setIsOpen} />
    </>
  );
});

export default AsideUser;
