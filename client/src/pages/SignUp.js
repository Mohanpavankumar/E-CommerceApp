import React, { useState } from 'react'
import loginicons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from './../helpers/imageTobase64';
import SummaryApi from './../EndPoints/index';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setshowConfirmPassword] = useState(true);
    const [data, setData] =useState({
        email : "",
        password : "",
        name : "",
        confirmPassword : "",
        profilePic : "",
    })

    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        const { name, value } = e.target

        setData((prev) =>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)
        setData((prev) =>{
            return{
                ...prev,
                profilePic : imagePic
            }
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        //check password and confirmpassword are same or not
        if(data.password === data.confirmPassword){
            //if both are same, fetching the api from backend server to post the data to database
            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method : SummaryApi.signUp.method,
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
    
            const dataApi = await dataResponse.json()

            //toast messages
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
            
        }else{
            toast.error("Please check Password and ConfirmPaassword!")
        }
    }

  return (
    <section id='signup'>
        <div className='mx-auto container p-8'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto shadow-md shadow-blue-600'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginicons} alt='login icons' className='rounded-full' />
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 py-4 cursor-pointer text-center absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                </div>
            
            <form className='p-5 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Name :</label>
                    <div className='bg-slate-100 p-2'>
                        <input type='text' 
                        placeholder='enter name'
                        name= 'name'
                        value={data.name}
                        onChange={handleOnChange}
                        required 
                        className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
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
                </div>

                <div>
                    <label>Confirm Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input 
                        type={showConfirmPassword ? "password" : "text"}
                        placeholder='enter confirm password'
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                        required 
                        className='w-full h-full outline-none bg-transparent'/>
                        <div className='cursor-pointer text-xl' onClick={() => setshowConfirmPassword((prev)=> !prev)}>
                            <span>
                                {
                                    showConfirmPassword ? (
                                        <FaEyeSlash/>
                                    ) :
                                    (
                                        <FaEye/>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                </div>

                <button className='bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-blue-800 transition-all mx-auto block mt-8'>Sign Up</button>
            </form>

            <p className='my-2 px-6'>Already have an account? <Link to={'/login'} className='text-blue-600 hover:underline hover:text-blue-800'>Login</Link></p>

            </div>
        </div>
    </section>
  )
}

export default SignUp