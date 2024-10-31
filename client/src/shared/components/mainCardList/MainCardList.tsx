import MainCardItem from "../mainCardItem/MainCardItem";

const MainCardList = () => {
  const count = 3;
  const arr = new Array(count).fill(0);
  return (
    <div className="w-full flex items-center justify-between gap-4 mt-5">
      {arr.map((_, index) => (
        <MainCardItem key={index} />
      ))}
    </div>
  );
};

export default MainCardList;
