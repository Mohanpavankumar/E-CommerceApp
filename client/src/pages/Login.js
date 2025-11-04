import React, { useContext, useState } from 'react'
import loginicons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from './../EndPoints/index';
import { toast } from 'react-toastify';
import Context from './../context/index';

const Login = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [data, setData] =useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()

    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name, value } = e.target

        setData((prev) =>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

    const dataApi = await dataResponse.json()

    //toast messages
    if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/")
        fetchUserDetails()
        fetchUserAddToCart()
    }
    if(dataApi.error){
        toast.error(dataApi.message)
    }
    }

    
  return (
    <section id='login'>
        <div className='mx-auto container p-8'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto shadow-md shadow-blue-600'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginicons} alt='login icons' className='rounded-full' />
                </div>
            
            <form className='p-5 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Email :</label>
                    <div className='bg-slate-100 p-2'>
                        <input type='email' 
                        placeholder='enter email'
                        name= 'email'
                        value={data.email}
                        onChange={handleOnChange}
                        required 
                        className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>

                <div>
                    <label>Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input 
                        type={showPassword ? "password" : "text"}
                        placeholder='enter password'
                        name='password'
                        value={data.password}
                        onChange={handleOnChange}
                        required 
                        className='w-full h-full outline-none bg-transparent'/>
                        <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev)=> !prev)}>
                            <span>
                                {
                                    showPassword ? (
                                        <FaEyeSlash/>
                                    ) :
                                    (
                                        <FaEye/>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <Link to={'/forgot-Password'} className='block w-fit ml-auto hover:underline hover:text-blue-600 '>
                        Forgot Password ?
                    </Link>
                </div>

                <button className='bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-blue-800 transition-all mx-auto block mt-8'>Login</button>
            </form>

            <p className='my-2 px-6'>Don't have account? <Link to={'/sign-up'} className='text-blue-600 hover:underline hover:text-blue-800'>Sign up</Link></p>

            </div>
        </div>
    </section>
  )
}

export default Login