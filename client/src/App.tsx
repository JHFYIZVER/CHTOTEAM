import { useEffect, useState } from "react";
import AppRouter from "./Components/AppRouter";
import AsideNav from "./Components/Aside/AsideNav/AsideNav";
import AsideUser from "./Components/Aside/AsideUser/AsideUser";
import Header from "./Components/Header/Header";

import "./App.css";

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <>
      <AsideNav />
      <div className="wrapper flex flex-col justify-between h-svh">
        <Header />
        {isLoaded ? <AppRouter /> : <div className="loader"></div>}
      </div>
      <AsideUser />
    </>
  );
}

export default App;
