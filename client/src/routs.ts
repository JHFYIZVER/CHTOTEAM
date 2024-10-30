import {
  ADMIN_ROUTE,
  MAIN_ROUTE,
  NOT_FOUND_ROUTE,
  PROFILE_ROUTE,
  GAME_ROUTE,
  LIBRARY_ROUTE,
  STORE_ROUTE,
} from "./Utils/const";

import NotFound from "./pages/404/NotFound";
import Admin from "./pages/Admin/Admin";
import Game from "./pages/Game/Game";
import Library from "./pages/Library/Library";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Store from "./pages/Store/Store";

export const authRouts = [{ path: PROFILE_ROUTE, Component: Profile }];

export const privateRoutes = [{ pathL: ADMIN_ROUTE, Component: Admin }];

export const publicRoutes = [
  { path: MAIN_ROUTE, Component: Main },
  { path: GAME_ROUTE + "/:id", Component: Game },
  { path: LIBRARY_ROUTE, Component: Library },
  { path: NOT_FOUND_ROUTE, Component: NotFound },
  { path: STORE_ROUTE, Component: Store },
];
