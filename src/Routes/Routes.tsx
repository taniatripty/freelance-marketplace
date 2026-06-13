
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/mainLayout";
export const router = createBrowserRouter([
  {
    path: "/",
   Component:MainLayout,
   children:[
    {
      index:true
    }
   ]
  },
]);