
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/mainLayout";
import Home from "@/pages/shared/home/home";
import Login from "@/Auth/login";
import AboutUs from "@/pages/shared/home/About";
import Register from "@/Auth/register";
import BecomeFreelancer from "@/pages/BecomeAfreelancer/becamefreelancer";
import ErrorPage from "@/components/Error/Error";
import FreelancerDetails from "@/pages/AllFreelancer/freelancerDetails";
import AddCategory from "@/Categories/Categories";
import CategoriesTable from "@/Categories/CategoriesTable";
import CreateGig from "@/CreateGig/CreateGig";
import AllGigs from "@/AllGigs/Allgigs";
import GigDetails from "@/AllGigs/GigsDetails";

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
      path:"/categories",
      element:<AddCategory></AddCategory>
    },
    {
      path:"/categorytable",
      element:<CategoriesTable></CategoriesTable>
    },
    {
      path:"/createGig",
      element:<CreateGig></CreateGig>
    },
    {
      path:"/allgigs",
      element:<AllGigs></AllGigs>
    },
    {
      path:"/gigs/:id",
      element:<GigDetails></GigDetails>
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