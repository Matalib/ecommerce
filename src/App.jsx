import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "navbar", element: <Navbar /> },
      { path: "footer", element: <Footer /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
};

export default App;
