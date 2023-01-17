import './App.css';
import { useState, useEffect } from 'react';
import './style.scss';
import'./media-query.css';
import Home from "./pages/Home";
import { Routes, Route, useNavigate,Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import AddEditBlogs from './pages/AddEditBlogs';
import About from './pages/About';
import Header from './components/Header';
import Auth from './pages/Auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';


function App() {
  const[active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    });
  },[]);
 
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    })
  }

  return (
    <div className='App'>
      <Header setActive={setActive} active={active} user={user} handleLogout ={handleLogout}/>
      <ToastContainer postion="top-center" />
     <Routes>
      <Route path= "/" element={<Home setActive={setActive} user ={user}/>}/>
      <Route path= "/detail/:id" element={<Details setActive ={setActive}/>}/>
      <Route 
      path= "/create" 
      element={user?.uid ?<AddEditBlogs user ={user}/>: <Navigate to="/"/>}
      />
      <Route
       path= "/update/:id" 
       element={user?.uid ?<AddEditBlogs user ={user} setActive ={setActive}/>: <Navigate to="/"/>}
       />
      <Route path= "/about" element={<About/>}/>
      <Route path= "/auth" element={<Auth setActive ={setActive} setUser ={setUser}/>}/>
      <Route path= "*" element={<NotFound/>}/>
     </Routes>
    </div>
  );
}

export default App;
