import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar/Navbar';
import Dashboard from "./components/Teacher/Dashboard/Dashboard"
import Create from "./components/Teacher/Create/Create"
import Register from "./components/Teacher/Register/Register"
import Upload from "./components/Teacher/Upload/Upload"
import Schedule from './components/Teacher/Create/Schedule';
import Sections from './components/Teacher/Sections/Sections';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route Component={Navbar}>
            <Route path='/' Component={Dashboard} exact />
            <Route path='/register' Component={Register} exact />
            <Route path='/sections' Component={Sections} exact />
            <Route path='/create' Component={Create} exact />
            <Route path='/create/schedule' Component={Schedule} exact />
            <Route path='/upload' Component={Upload} exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
