import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import fetchCategoryWiseProduct from './../helpers/fetchCategoryWiseProduct';
import displayCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';

const HorizontalCardProduct = ({category, heading}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()


    const fetchData = async() => {
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setLoading(false)

      setData(categoryProduct?.data || [])
    }
    useEffect(()=>{
      fetchData()
    },[])

    const scrollLeft = () =>{
      scrollElement.current.scrollLeft -=300
    }

    const scrollRight = () =>{
      scrollElement.current.scrollLeft +=300
    }

  return (
    <div className='container mx-auto px-4 my-6'>

        <h2 className='text-2xl font-semibold py-4'> {heading} </h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none' ref={scrollElement}>
          <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block transition-all' onClick={scrollLeft}><FaAngleLeft /></button>
          <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block transition-all' onClick={scrollRight}><FaAngleRight /></button>
          { loading ? (
            loadingList.map((product,index)=>{
            return(
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                </div>
                <div className='p-4 grid w-full gap-2'>
                  <h2 className='font-medium md:text-lg text-ellipsis line-clamp-1 text-black capitalize bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                  <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                  <div className='flex gap-3 w-full'>
                    <p className='text-blue-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                  </div>
                  <button className='text-sm bg-slate-200 text-white px-3 py-1 p-1 animate-pulse rounded-full'></button>
                </div>
              </div>
            )
          })
          ) : (
            data.map((product,index)=>{
            return(
              <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                    <img src={product.productImage[0]} alt={product.heading} className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer'/>
                </div>
                <div className='p-4 grid'>
                  <h2 className='font-medium md:text-lg text-ellipsis line-clamp-1 text-black capitalize'>{product?.productName}</h2>
                  <p className='capitalize text-slate-500'>{product?.category}</p>
                  <div className='flex gap-3'>
                    <p className='text-blue-600 font-medium'>{ displayCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                  </div>
                  <button className='text-sm bg-blue-600 hover:bg-blue-700  text-white px-3 py-1 rounded-full' onClick={(e) =>addToCart(e,product?._id)}>Add to Cart</button>
                </div>
              </Link>
            )
          })
          )
          
        }
        </div>
    </div>
  )
}

export default HorizontalCardProduct