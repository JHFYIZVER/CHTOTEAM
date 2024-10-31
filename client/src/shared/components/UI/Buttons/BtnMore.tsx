const BtnMore = () => {
  return (
    <button className="bg-dark py-4 rounded-smallBtn flex items-center gap-3 px-6 w-full max-w-[200px] justify-center">
      Подробнее
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 8L8 1M8 1H1.7M8 1V7.3"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BtnMore;
