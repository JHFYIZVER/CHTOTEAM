import "./App.css";
import AppRouter from "./Components/AppRouter";
import AsideNav from "./Components/Aside/AsideNav/AsideNav";
import AsideUser from "./Components/Aside/AsideUser/AsideUser";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <AsideNav />
      <div className="wrapper flex flex-col justify-between">
        <Header />
        <AppRouter />
      </div>
      <AsideUser />
    </>
  );
}

export default App;
