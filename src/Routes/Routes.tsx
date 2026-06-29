
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
import OrderPage from "@/OrdersPage/OrderPage";
import CreateReview from "@/CreateReviews/CreateReviews";
import DashboardLayout from "@/Dashboard/Dashboard";
import DashboardHome from "@/Dashboard/DashboardHome/DashboradHome";
import MyProfile from "@/Dashboard/MyProfile/MyProfile";
import MyGigs from "@/MyGigs/MyAllGigs";
import AllFreelancers from "@/pages/AllFreelancer/AllFreelancers";
import PrivateRoute from "./privateRoutes";
import EditGig from "@/MyGigs/EditGigs/EditGigs";
import EditProfile from "@/Dashboard/MyProfile/EditProfile/EditProfile";

import AddWebsiteReview from "@/pages/WebsiteReview/WebsiteReview";
import MyEarnings from "@/Dashboard/FreelancerDashboard/MyEarning/MyEarning";
import BuyerReviews from "@/Dashboard/BuyerReviews/BuyerReviews";
import CompletedOrders from "@/Dashboard/ClientDashboard/CompletedOrders/CompletedOrders";
import ClientPayment from "@/Dashboard/ClientDashboard/ClientPayment/ClientPayment";
import AllUsers from "@/Dashboard/AdminDashboard/AllUsers/AllUsers";



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
      path:"/categorytable",
      element:<CategoriesTable></CategoriesTable>
    },
    {
      path:"/becomefreelancer",
      element:<PrivateRoute>
        <BecomeFreelancer></BecomeFreelancer>
      </PrivateRoute>
    },
    {
      path:"/allfreelancer",
      element:<AllFreelancers></AllFreelancers>
    },
    {
      path:"/allservices",
      element:<AllGigs></AllGigs>
    },
    {
      path:"gigs/:id",
      element:<GigDetails></GigDetails>
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
      path:"/allgigs",
      element:<AllGigs></AllGigs>
    },
    
    {
      path:"/checkout/:id",
      element:<Checkout></Checkout>
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
     path:"/orders/:id",
     element:<OrderPage></OrderPage>
    },
    {
      path:"review/:orderId",
      element:<CreateReview></CreateReview>
    },
    {
      path:"websitereview",
      element:<AddWebsiteReview></AddWebsiteReview>
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
  {
    path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        index:true,
        element:<DashboardHome></DashboardHome>
      },
      {
        path:"profile",
        element:<MyProfile></MyProfile>
      },
      {
        path:"users",
        element:<AllUsers></AllUsers>
      },
      {
        path:"edit-profile",
        element:<EditProfile></EditProfile>
      },
      {
      path:"createGig",
      element:<CreateGig></CreateGig>
    },
     {
      path:"myallgigs",
      element:<MyGigs></MyGigs>
    },
    {
      path:"edit-gig/:id",
      element:<EditGig></EditGig>
    },
    {
      path:"gig/:id",
      element:<GigDetails></GigDetails>
    },
      {
     path:"managesellerOrder",
     element:<ManageSellerOrders></ManageSellerOrders>

    },
    {
      path:"myearning",
      element:<MyEarnings></MyEarnings>
    },
    {
      path:"buyerpayment",
      element:<ClientPayment></ClientPayment>
    },
    {
      path:"myreviews",
      element:<BuyerReviews></BuyerReviews>
    },
    {
      path:"completedorders",
      element:<CompletedOrders></CompletedOrders>
    },
    
    {
      path:"mypurchase",
      element:<MyPurchaseServices></MyPurchaseServices>
    },

    ]

  }
]);