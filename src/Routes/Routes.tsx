
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/mainLayout";
import Home from "@/pages/shared/home/home";
export const router = createBrowserRouter([
  {
    path: "/",
   Component:MainLayout,
   children:[
    {
      index:true,
      element:<Home></Home>
    }
   ]
  },
]);