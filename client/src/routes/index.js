import { createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import App from './../App';
import Home from './../pages/Home';
import ForgotPassword from './../pages/ForgotPassword';
import SignUp from './../pages/SignUp';
import AdminPanel from './../pages/AdminPanel';
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "forgot-Password",
                element : <ForgotPassword/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    }
                ]
            }
        ]
    }
]);


export default router;