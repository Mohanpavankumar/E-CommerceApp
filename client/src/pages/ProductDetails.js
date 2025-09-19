import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../EndPoints'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import displayCurrency from '../helpers/displayCurrency'

const ProductDetails = () => {

    const [data, setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")

    const fetchProductDetails = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url,{
            method : SummaryApi.productDetails.method,
            headers : {
                "content-type" : "application/json",
            },
            body :  JSON.stringify({
                productId : params?.id
            })
        })
        setLoading(false)
        const dataReponse = await response.json()
        setData(dataReponse?.data)
        setActiveImage(dataReponse?.data?.productImage[0])
    }

    useEffect(()=>{
        fetchProductDetails()
    },[params])

    const handleMouseClickProduct = (imageURL) =>{
        setActiveImage(imageURL)
    }
  return (
    <div className='container mx-auto p-4'>
        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
            {/**Product Image**/}
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                    <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' alt="" />
                </div>
                <div className='h-full'>
                    {
                        loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {
                                productImageListLoading.map((el,index) =>{
                                    return(
                                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>
                                        </div>
                                )
                            })
                                }
                            </div>
                        ) : (
                            <div className='flex gap-5 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {
                                data?.productImage?.map((imageURL, index) =>{
                                    return(
                                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imageURL}>
                                            <img src={imageURL} className='w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseClickProduct(imageURL)} onClick={()=>handleMouseClickProduct(imageURL)} alt={imageURL}/>
                                        </div>
                                )
                            })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {/**Product Details**/}
            {
                loading ? (
                    <div className="space-y-3 p-4 rounded-2xl">
                        {/* Brand Badge */}
                        <p className="bg-gradient-to-r bg-slate-200 animate-pulse h-6 w-full rounded-full inline-block text-sm font-semibold shadow-sm"></p>

                        {/* Product Name */}
                        <h2 className="text-2xl lg:text-4xl font-bold h-6 w-full bg-slate-200 animate-pulse rounded-full leading-tight"></h2>

                        {/* Category */}
                        <p className="capitalize bg-slate-200 animate-pulse min-w-[100px] h-6 rounded-full tracking-wide text-sm"></p>

                        {/* Ratings */}
                        <div className="flex items-center gap-1 bg-slate-200 h-6 rounded-full  animate-pulse w-full"></div>

                        {/* Price Section */}
                        <div className="flex items-center gap-3">
                            <p className="bg-slate-200 rounded-full h-6 animate-pulse w-full"></p>
                            <p className="bg-slate-200 rounded-full h-6 animate-pulse w-full"></p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-3 min-w-[120px] font-medium border-2 bg-slate-200 animate-pulse rounded-full transition-all duration-300"></button>
                            <button className="px-4 py-3 min-w-[120px] font-medium border-2 shadow-sm bg-slate-200 animate-pulse rounded-full hover:shadow-lg transition-all duration-300"></button>
                        </div>

                        <div>
                            <p className='bg-slate-200 font-medium my-1 rounded-full h-6 animate-pulse'></p>
                            <p className='bg-slate-200 rounded-full h-10 animate-pulse'></p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 p-4 rounded-2xl">
                        {/* Brand Badge */}
                        <p className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full inline-block w-fit text-sm font-semibold shadow-sm">
                            {data?.brandName}
                        </p>

                        {/* Product Name */}
                        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
                            {data?.productName}
                        </h2>

                        {/* Category */}
                        <p className="capitalize text-gray-400 tracking-wide text-sm">
                            {data?.category}
                        </p>

                        {/* Ratings */}
                        <div className="flex items-center gap-1 text-blue-600">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                            {/* <span className="ml-2 text-sm text-gray-500">(4.5/5)</span> */}
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center gap-3 text-xl lg:text-2xl font-semibold my-2">
                            <p className="text-blue-600">{displayCurrency(data?.sellingPrice)}</p>
                            <p className="text-gray-400 line-through">{displayCurrency(data?.price)}</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 my-3">
                            <button className="px-4 py-1 min-w-[120px] text-blue-600 font-medium border-2 border-blue-600 rounded-full shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300">
                            Buy Now
                            </button>
                            <button className="px-4 py-1 min-w-[120px] text-white bg-blue-600 font-medium border-2 border-blue-600 rounded-full shadow-sm hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
                            Add To Cart
                            </button>
                        </div>

                        <div className="mt-2">
                        {/* Section Title */}
                        <h3 className="text-lg font-semibold text-slate-700 pb-2 mb-1">
                            Description
                        </h3>

                        {/* Description Text */}
                        <p className="text-gray-600 leading-relaxed">
                            {data?.description || "No description available for this product."}
                        </p>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ProductDetails