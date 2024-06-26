import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "../pages/home";
import SamplePage from "../pages/carprice";
import NotFound from "../pages/not-found";
import { RouterProvider } from "react-router";
import "~/assets/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import "~/utils/ensure-basepath";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="/carprice" element={<SamplePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
  {
    basename: process.env.BASE_PATH,
  },
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
