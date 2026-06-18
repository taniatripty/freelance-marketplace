
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/mainLayout";
import Home from "@/pages/shared/home/home";
import Login from "@/Auth/login";
import AboutUs from "@/pages/shared/home/About";
import Register from "@/Auth/register";
import BecomeFreelancer from "@/pages/BecomeAfreelancer/becamefreelancer";
import ErrorPage from "@/components/Error/Error";
import FreelancerDetails from "@/pages/AllFreelancer/freelancerDetails";
export const router = createBrowserRouter([
  {
    path: "/",
   Component:MainLayout,
   errorElement:<ErrorPage></ErrorPage>,
   children:[
    {
      index:true,
      element:<Home></Home>,
      
    },
    {
      path:'/aboutus',
      element:<AboutUs></AboutUs>
    },
    {
      path:'/becomefreelancer',
      element:<BecomeFreelancer></BecomeFreelancer>

    },
    {
      path:"/freelancer/:id",
      element:<FreelancerDetails></FreelancerDetails>

    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'register',
      element:<Register></Register>
    }

   ]
  },
]);