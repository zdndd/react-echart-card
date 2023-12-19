import Portal from "../page/Portal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portal />,
  },
  {
    path: "/portal",
    element: <Portal />,
  },
]);

export default router;
