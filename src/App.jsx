import Navbar from "./components/navbar";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
function App() {

  const Layout = ()=>{
    return(
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            {/* <Menu/> */}
          </div>
          <div className="contentContainer">
            {/* <Outlet/> */}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element:<Home/>,
      },
    ]
  },
]);

  return (
    <RouterProvider router={router} />
  )
}

export default App