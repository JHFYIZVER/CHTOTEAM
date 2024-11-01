import Like from "../../../assets/like.svg";
import ReplyImg from "../../../assets/reply.svg";

const Reply = () => {
  return (
    <div className="bg-blue/50 rounded-lg p-4 flex gap-3 my-4">
      <h3 className="h-full w-fit text-gray">Juxtopposed2</h3>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <h3>Juxtopposed</h3>
          <data className="text-gray">Posted on 12 Sep 2023</data>
        </div>
        <p>It’s fine i guess lol</p>
        <hr className="my-4 border-[#41435A]" />
        <div className="btn-group flex gap-3">
          <button className="bg-dark text-[#66C0F4] flex items-center gap-2 rounded-smallBtn py-3 px-5">
            <img src={Like} alt="Like" />
            374
          </button>
          <button className="bg-dark text-red flex items-center gap-2 rounded-smallBtn py-3 px-5">
            <img className="rotate-180" src={Like} alt="Dislike" />
            374
          </button>
          <button className="bg-dark rounded-smallBtn flex items-center gap-2 py-3 px-5">
            <img src={ReplyImg} alt="Reply" /> Ответить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reply;
