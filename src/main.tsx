import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router";
import {router} from "./Routes/Routes"
import Authprovider from './AuthContex/Authprovider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import App from "./App.tsx"
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient
    
   }>
    <Authprovider>
   <RouterProvider router= {router} />
   </Authprovider>
   </QueryClientProvider>
  </StrictMode>,
)
