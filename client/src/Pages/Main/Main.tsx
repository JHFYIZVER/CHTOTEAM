import BtnMore from "../../Components/UI/Buttons/BtnMore";
import MainCardList from "../../Components/MainCardList/MainCardList";
import MainCategoryList from "../../Components/MainCategoryList/MainCategoryList";
import useTitle from "../../hooks/useTitle";

const Main = () => {
  useTitle("Главная");
  return (
    <main className="mr-[240px] mt-[66px]">
      <section className="main-game p-[10px]">
        <div className="w-full relative overflow-hidden">
          <img
            className="w-full h-[380px] bg-slate-400 z-0"
            src="https://rog.asus.com/media/1719369630894.jpg"
            alt="main-game"
          />
          <div className="absolute bg-black/50 top-0 right-0 max-w-[300px] w-full h-screen text-white p-4">
            <h1 className="font-bold pb-5 text-5xl">Elden Ring</h1>
            <p className="text-[14px] pb-3">
              THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by
              grace to brandish the power of the Elden Ring and become an Elden
              Lord in the Lands Between.
            </p>
            <BtnMore />
          </div>
        </div>
        <MainCardList />
      </section>
      <section className="new-games p-[10px] mb-10">
        <h2 className="font-bold text-3xl text-white">Новинки</h2>
        <MainCategoryList />
      </section>
      <section className="new-games p-[10px] mb-10">
        <h2 className="font-bold text-3xl text-white">Популярные</h2>
        <MainCategoryList />
      </section>
      <section className="new-games p-[10px] mb-10">
        <h2 className="font-bold text-3xl text-white">Рекомендуемые</h2>
        <MainCategoryList />
      </section>
    </main>
  );
};

export default Main;
