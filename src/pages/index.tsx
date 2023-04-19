import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import { SHARE_ROUTER } from "./Share";
import { NO_MATCH_ROUTER } from "./NoMatch";
import { InitData } from "common/helper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      SHARE_ROUTER,
      NO_MATCH_ROUTER,
    ],
  },
]);

export default function App() {
  useEffect(() => {
    InitData();
  }, []);

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
