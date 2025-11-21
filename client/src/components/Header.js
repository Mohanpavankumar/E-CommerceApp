import React, { useState } from 'react';
import Logo from './Logo';
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from './../EndPoints/index';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import { useContext } from 'react';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLserach = new URLSearchParams(searchInput?.search)
  const searchQuery = URLserach.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async() =>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    //toast messages
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch = (e) =>{
    const {value} = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate('/search')
    }
  }

  return (
    <header className='h-16 shadow-sm bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-6 justify-between'>
        <div>
          <Link to='/'>
            <Logo w={120} h={70} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search products here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white'>
            <IoIosSearch/>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <div className='relative flex justify-center'>
            {
              user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                {
                  user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                  ) :(
                    <FaRegCircleUser/>
                  )
                }
              </div>
              )
            }

            {
              menuDisplay && (
                <div className='absolute hidden md:block bg-white bottom-0 top-11 h-fit p-2 shadow-md rounded'>
                  <nav>
                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-200 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                  </nav>
                </div>
              )
            }
          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-3xl cursor-pointer relative'>
                <span><PiShoppingCartBold/></span>

              <div className='bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-1'>
                <p className='text-xs'>{context?.cartProductCount}</p>
              </div>
          </Link>
            )
          }

          <div>
            {
              user?._id ? (
                <Link to='/' onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-800'>Logout</Link>
              )
              :
              (
                <Link to='/login' className='px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-800'>Login</Link>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header