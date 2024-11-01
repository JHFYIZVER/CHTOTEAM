import useTitle from "../../hooks/useTitle";
import BtnMore from "../../shared/components/UI/Buttons/BtnMore";
import Elden from "../../assets/Elden.jpg";

const Main = () => {
  useTitle("Главная");
  return (
    <main className="mr-[240px] mt-[66px] p-3">
      <section className="advertising-banner flex flex-col gap-3">
        <div className="relative">
          <img className="w-full" src={Elden} alt="Elden" />
          <div className="absolute bg-black/50 text-white top-0 right-0 max-w-xs w-full h-full flex flex-col gap-5 p-4">
            <h1 className="font-bold text-[clamp(20px,4vw,40px)]">
              Elden Ring
            </h1>
            <p className="text-[clamp(12px,2vw,20px]">
              THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by
              grace to brandish the power of the Elden Ring and become an Elden
              Lord in the Lands Between.
            </p>
            <BtnMore />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="max-w-[380px] w-full bg-dark h-[200px]"></div>
          <div className="max-w-[380px] w-full bg-dark h-[200px]"></div>
          <div className="max-w-[380px] w-full bg-dark h-[200px]"></div>
        </div>
      </section>
    </main>
  );
};

export default Main;
