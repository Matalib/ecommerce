import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";

import NotFound from "./components/NotFound/NotFound";
import Brands from './components/Brands/Brands'

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from './context/userContext'
import Carts from './components/Carts/Carts';
import Products from './components/Products/Products';
import ProdectedRoutes from './components/ProdectedRoutes/ProdectedRoutes'
import CartContextProvider from "./context/CartContextProvider";

let routers = createBrowserRouter([
      {path:'' , element:<Layout/> , children:[
      {index:true , element:<Register/>},
      {path:'login' , element:<Login/>},
      {path:'register' , element:<Register/>},
      {path:'brands' , element:<ProdectedRoutes><Brands/></ProdectedRoutes>},
      {path:'carts' , element:<ProdectedRoutes><Carts/></ProdectedRoutes>},
      {path:'products' , element:<ProdectedRoutes><Products/></ProdectedRoutes>},
      {path:'home' , element:<ProdectedRoutes><Home/></ProdectedRoutes>},
     
      {path:'*' , element:<NotFound/>}
    ]}
  ])


const App = () => {
  return (
    <CartContextProvider>
      <UserContextProvider> 
    
        <RouterProvider router = {routers}></RouterProvider>

      </UserContextProvider>
    </CartContextProvider>
  );
};

export default App;
