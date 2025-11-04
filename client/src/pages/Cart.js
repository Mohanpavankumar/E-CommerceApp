import React from 'react'
import { useState } from 'react'
import SummaryApi from '../EndPoints'
import { useEffect } from 'react'
import { useContext } from 'react'
import Context from '../context';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadindCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : "include",
            headers : {
                "content-type" : 'application/json'
            }
        })
        setLoading(false)

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='container mx-auto px-6'>
        <div className='text-center text-lg py-2 m-3'>
            {
            data.length === 0 &&  !loading && (
                <p className='bg-white py-5'>No Data</p>
            )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
            {/***view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadindCart.map(el => {
                            return(
                                <div key={el+"Add to Cart Loading"} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product,index)=>{
                            return(
                                <div key={product?._id+"Add to Cart Loading"} className='w-full bg-white h-32 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage?.[0]}  className='w-full h-full object-scale-down mix-blend-multiply' alt=''/>
                                    </div>
                                    <div className='p-4'>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    </div>    
                                    
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/**Summary */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                loading ? (
                    <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                        Total
                    </div>
                ) : (
                    <div className='h-36 bg-slate-200'>
                        Total
                    </div>
                )
                }
            </div>
        </div>
    </div>
  )
}

export default Cart