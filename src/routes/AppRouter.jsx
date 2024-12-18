import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import PeoplePage from "../pages/PeoplePage";
import PlanetsPage from "../pages/PlanetsPage";
import StarshipsPage from "../pages/StarshipsPage";
import FilmsPage from "../pages/FilmsPage";
import NotFound from "../pages/NotFound";
import Layout from "../pages/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/planet" element={<PlanetsPage />} />
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/starships" element={<StarshipsPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router
