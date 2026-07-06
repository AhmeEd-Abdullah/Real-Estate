import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuthLayout } from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/list",
                    element: <ListPage />,
                },
                {
                    path: "/posts/:id",
                    element: <SinglePage />,
                },
                {
                    path: "/Login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
            ],
        },
        {
            path: "/",
            element: <RequiredAuthLayout />,
            children: [
                {
                    path: "/profile",
                    element: <ProfilePage />,
                },
                {
                    path: "/profile/update",
                    element: <ProfileUpdatePage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
