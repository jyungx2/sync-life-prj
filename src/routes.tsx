import { createBrowserRouter } from "react-router-dom";
import Kanban from "./pages/kanban";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Kanban />,
  },
]);

export default router;
