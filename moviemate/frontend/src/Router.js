import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import ViewMovies from './pages/ViewMovies';
import Register from "./components/Register";
import Login from "./components/Login";
import EditMovie from './pages/EditMovie';

const router = createBrowserRouter([
    { path: '', element: <Register/> },
    { path: '/register', element: <Register/> },
    { path: 'login', element: <Login/> },
    { path: 'home', element: <Home/> },
    { path: '/add', element: <AddMovie /> },
    { path: '/movies', element: <ViewMovies /> },
    { path: '/edit/:id', element: <EditMovie /> },
]);

export default router;