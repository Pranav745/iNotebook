import './App.css';
import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import NoteState from './Context/NoteState'; // Make sure to import NoteState
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import Signup from './Components/Signup';
import LoginPage from './Components/LoginPage';
import Alert from './Components/Alert';
import NoteContext from './Context/noteContext'

const Layout = () => {
  const context = useContext(NoteContext);
  const { alert } = context;

  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
