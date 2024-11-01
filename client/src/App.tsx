import { useEffect, useState } from "react";
import Header from "./shared/components/header/Header";
import AppRouter from "./shared/components/AppRouter";
import AsideNav from "./shared/components/aside/AsideNav/AsideNav";
import AsideUser from "./shared/components/aside/AsideUser/AsideUser";

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
