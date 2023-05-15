import './App.css';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import Dashboard from "./components/Teacher/Dashboard/Dashboard"
import Create from "./components/Teacher/Create/Create"
import Register from "./components/Teacher/Register/Register"
import Upload from "./components/Teacher/Upload/Upload"
import Schedule from './components/Teacher/Create/Schedule';
import Sections from './components/Teacher/Sections/Sections';
import { ToastContainer } from "react-toastify"
import Login from './components/Login/Login';
import ScheduledExam from './components/Student/ScheduledExam';

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path='/login' Component={Login} />
          <Route Component={Navbar}>
            <Route path='/admin/dashboard' Component={Dashboard} exact />
            <Route path='/admin/register' Component={Register} exact />
            <Route path='/admin/sections' Component={Sections} exact />
            <Route path='/admin/create' Component={Create} exact />
            <Route path='/admin/create/schedule' Component={Schedule} exact />
            <Route path='/admin/upload' Component={Upload} exact />
          </Route>
          <Route Component={Navbar}>
            <Route path='student/attend' Component={ScheduledExam} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
