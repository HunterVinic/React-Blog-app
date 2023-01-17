
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
     updateProfile
     } from 'firebase/auth';
import React,{ useState } from 'react'
import { toast } from 'react-toastify';
import {auth} from "../firebase";
import  {useNavigate}from "react-router-dom";

const initialState ={
    firstname:"",
    lastname:"",
    emil:"",
    password:"",
    confirmpassword:""

};
const Auth = ({setActive, setUser}) => {
    const[state, setState] = useState(initialState);
    const [signUp, setSignup] = useState (false);

    const{emil, password, firstname,lastname,confirmpassword} = state;

    const  navigate = useNavigate();

  const handleChange =(e) => {
    setState ({...state,[e.target.name]: e.target.value})
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    if(!signUp){
        if(emil && password){
            const{user} = await signInWithEmailAndPassword(
                auth,
                emil,
                password
            );
            setUser(user);
            setActive("home");
        }else{
            return toast.error("All fields are mandatory to fill")
        }
    }else {
        if (password !== confirmpassword){
            return toast.error("Password don't match")
        }
        if (firstname && lastname && emil && password){
            const {user} = await createUserWithEmailAndPassword(
                auth,
                emil,
                password);
            await updateProfile(user, {displayName: `${firstname} ${lastname}`});
            setActive("home");

        }else{
            return toast.error("All fields are Mandatoty to fill");
        }
    }

     navigate("/");
  };
      
  return (
    <div className='container-fluid mb-4'>
        <div className='container'>
            <div className='col-12 text-center'>
                <div className='text-center heading py-2'>
                    {!signUp ? "Sign-In" : "Sign-Up"}
                </div>
            </div>
            <div className='row h-100 justify-content-center align-item-center'>
                <div className='col-10 col-md-8 col-lg-6'>
                    <form className='row' onSubmit={handleAuth}>
                        {signUp &&(
                            <><div className='col-6 py-3'>
                                  <input
                                      type="text"
                                      className='form-control input-text-box'
                                      placeholder='First Name'
                                      name="firstname"
                                      value={firstname}
                                      onChange={handleChange} />
                              </div><div className='col-6 py-3'>
                                      <input
                                          type="text"
                                          className='form-control input-text-box'
                                          placeholder='Last Name'
                                          name="lastname"
                                          value={lastname}
                                          onChange={handleChange} />
                                  </div></>
                        )}
                        <div className='col-12 py-3'>
                            <input
                            type="email"
                            className='form-control input-text-box'
                            placeholder='Email'
                            name="emil"
                            value={emil}
                            onChange ={handleChange}
                            />
                        </div>
                        
                        <div className='col-12 py-3'>
                            <input
                            type="password"
                            className='form-control input-text-box'
                            placeholder='Password'
                            name="password"
                            value={password}
                            onChange ={handleChange}
                            />
                        </div>
                        {signUp &&(
                        <div className='col-12 py-3'>
                            <input
                            type="password"
                            className='form-control input-text-box'
                            placeholder='Confirm Password'
                            name="confirmpassword"
                            value={confirmpassword}
                            onChange ={handleChange}
                            />
                        </div>
                        )}

                        <div className='col-12 py-3 text-center'>
                            <button className={`btn ${!signUp ? "btn-sign-in": "btn-sign-up"}`}
                            type="submit"
                             >
                                {!signUp ? "Sign-In":"Sign-Up"}
                             </button>
                        </div>
                    </form>
                </div>
                {!signUp? (
                    <div className='text-cener jusity-content-center mt-2 pt-2'>
                        <p className='small fw-bold at-2 pt-1 mb-0'>
                            Don't have an account ? &nbsp;
                            <span className='link-danger' style={{textDecoration:"none", cursor:"pointer"}}
                            onClick={() => setSignup(true)}
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>

                ):(
                    <div className='text-cener jusity-content-center mt-2 pt-2'>
                        <p className='small fw-bold at-2 pt-1 mb-0'>
                            Already have an account ? &nbsp;
                            <span className='link-danger'
                             style={{
                                textDecoration:"none",
                                 cursor:"pointer",
                                 color: "#298af2"
                                 }}
                                 onClick={() => setSignup(false)}
                                 >
                                Sign In
                            </span>
                        </p>
                    </div>


                )}
            </div>
        </div>
    </div>
  )
}

export default Auth