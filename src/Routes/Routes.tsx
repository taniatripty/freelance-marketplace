
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
import Checkout from "@/Checkout/Checkout";
import MyPurchaseServices from "@/MyPurchaseService/MyPurchaseService";
import ManageSellerOrders from "@/ManageSellerOrder/ManageSellerOrder";
import Chat from "@/Chat/Chat";
import PaymentPage from "@/PaymentPage/PaymentPage";


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
      path:"/checkout/:id",
      element:<Checkout></Checkout>
    },
    {
      path:"/mypurchase",
      element:<MyPurchaseServices></MyPurchaseServices>
    },
    {
     path:"/managesellerOrder",
     element:<ManageSellerOrders></ManageSellerOrders>

    },
    {
      path:"/chat/:orderId",
      element:<Chat></Chat>
    },
    {
      path:"/payment/:orderId",
      element:<PaymentPage></PaymentPage>
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