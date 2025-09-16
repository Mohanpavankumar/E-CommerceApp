import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import fetchCategoryWiseProduct from './../helpers/fetchCategoryWiseProduct';
import displayCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const VerticalCardProduct = ({category, heading}) => {

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
          {
          data.map((product,index)=>{
            return(
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                    <img src={product.productImage[0]} alt={product.heading} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply cursor-pointer'/>
                </div>
                <div className='p-4 grid gap-3'>
                  <h2 className='font-medium md:text-lg text-ellipsis line-clamp-1 text-black capitalize'>{product?.productName}</h2>
                  <p className='capitalize text-slate-500'>{product?.category}</p>
                  <div className='flex gap-3'>
                    <p className='text-blue-600 font-medium'>{ displayCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                  </div>
                  <button className='text-sm bg-blue-600 hover:bg-blue-700  text-white px-3 py-1 rounded-full'>Add to Cart</button>
                </div>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default VerticalCardProduct