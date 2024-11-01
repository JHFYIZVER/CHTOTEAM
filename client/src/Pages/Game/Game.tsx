import Comment from "../../shared/components/comment/Comment";
import Reply from "../../shared/components/comment/Reply";
import SwiperGame from "../../shared/components/swiper/Swiper";
import { Select } from "@headlessui/react";

const Game = () => {
  return (
    <main className="mr-[240px] mt-[66px] p-35">
      <section className="game-info">
        <h1 className="font-bold text-[clamp(20px,4vw,40px)] text-white">
          Half-Life: Alyx
        </h1>
        <div className="flex flex-wrap gap-7 text-white">
          <SwiperGame />
          <div className="info flex flex-col gap-4 items-start max-w-[480px] w-full">
            <p className="text-[clamp(12px,2vw,20px)] leading-[20px]">
              Half-Life: Alyx is Valve’s VR return to the Half-Life series. It’s
              the story of an impossible fight against a vicious alien race
              known as the Combine, set between the events of Half-Life and
              Half-Life 2. Playing as Alyx Vance, you are humanity’s only chance
              for survival.
            </p>
            <ul className="text-[clamp(10px,2vw,14px)] leading-[20px] flex flex-col gap-2 text-tag">
              <li>
                Playing: <span className="text-link">Playing</span> (1,551)
              </li>
              <li>
                Wants to play: <span className="text-link">Wants to play</span>{" "}
                (57,831)
              </li>
              <li>
                Passed: <span className="text-link">Passed (57,831)</span>
              </li>
              <li>
                TAGS:{" "}
                <span className="text-link">RPG, Platformer, Rogue-Like</span>
              </li>
              <li>
                RELEASE DATA: <span className="text-link">23 Mar, 2020</span>
              </li>
              <li>
                DEVELOPER: <span className="text-link">Valve</span>
              </li>
              <li>
                RATING: <span className="text-link">87%</span>
              </li>
            </ul>

            <Select
              className="btn rounded-smallBtn bg-dark flex items-center justify-center py-3 px-8"
              name="status"
              aria-label="Project status"
            >
              <option defaultChecked hidden value="active">
                Добавить к себе
              </option>
              <option value="paused">Играю</option>
              <option value="delayed">Буду играть</option>
              <option value="canceled">Заброшено</option>
            </Select>
          </div>
        </div>
      </section>
      <section className="about-game text-white flex flex-col gap-3">
        <h2 className="font-bold text-[clamp(20px,2vw,35px)]">О игре</h2>
        <p className="discription text-discription">
          Half-Life: Alyx is Valve’s VR return to the Half-Life series. It’s the
          story of an impossible fight against a vicious alien race known as the
          Combine, set between the events of Half-Life and Half-Life 2. Playing
          as Alyx Vance, you are humanity’s only chance for survival. The
          Combine’s control of the planet since the Black Mesa incident has only
          strengthened as they corral the remaining population in cities. Among
          them are some of Earth’s greatest scientists: you and your father, Dr.
          Eli Vance. As founders of a fledgling resistance, you’ve continued
          your clandestine scientific activity—performing critical research, and
          building invaluable tools for the few humans brave enough to defy the
          Combine. Every day, you learn more about your enemy, and every day you
          work toward finding a weakness. ABOUT GAMEPLAY IN VR: Valve’s return
          to the Half-Life universe that started it all was built from the
          ground up for virtual reality. VR was built to enable the gameplay
          that sits at the heart of Half-Life. Immerse yourself in deep
          environmental interactions, puzzle solving, world exploration, and
          visceral combat. Lean to aim around a broken wall and under a Barnacle
          to make an impossible shot. Rummage through shelves to find a healing
          syringe and some shotgun shells. Manipulate tools to hack alien
          interfaces. Toss a bottle through a window to distract an enemy. Rip a
          Headcrab off your face and throw it out the window. COMMUNITY-BUILT
          ENVIRONMENTS A set of Source 2 tools for building new levels is
          included with the game, enabling any player to build and contribute
          new environments for the community to enjoy through Half-Life: Alyx's
          Steam Workshop. Hammer, Valve’s level authoring tool, has been updated
          with all of the game's virtual reality gameplay tools and components.
        </p>
      </section>
      <section className="comments text-white mt-10">
        <div className="flex items-center justify-between mb-5 ">
          <h2 className="font-bold text-[clamp(20px,2vw,35px)] ">
            Комментарии
          </h2>
          <button className="btn rounded-smallBtn bg-dark flex items-center justify-center py-3 px-8">
            Добавить комментарий
          </button>
        </div>
        <Comment />
        <Reply />
      </section>
    </main>
  );
};

export default Game;
