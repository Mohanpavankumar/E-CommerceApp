import React from 'react'
import { useState, useEffect, useContext } from 'react'
import SummaryApi from '../EndPoints'
import Context from '../context';
import displayCurrency from './../helpers/displayCurrency';
import { IoIosCloseCircle } from "react-icons/io"; 
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    // Adjusted loading skeleton logic for dynamic count
    const loadindCart = new Array(context.cartProductCount > 0 ? context.cartProductCount : 3).fill(null)

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

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: newQuantity
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    }

    const increaseQty = (id, qty) => updateQuantity(id, qty + 1);
    
    const decreaseQty = (id, qty) => {
        if (qty > 1) {
            updateQuantity(id, qty - 1);
        }
    };

    const deleteCartProduct = async(id) =>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((previousValue,currentValue)=> previousValue + (currentValue.quantity * currentValue?.productId?.sellingPrice),0)
    
  return (
    <div className='container mx-auto px-4 md:px-8 py-10 min-h-[calc(100vh-120px)] bg-gray-50'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center'>
            <FaShoppingCart className='text-blue-600 mr-3'/> 
            Your Shopping Cart
        </h1>
        
        {/* Empty Cart Message - Fully Responsive */}
        {
        data.length === 0 && !loading && (
            <div className='flex flex-col items-center justify-center p-6 h-96 bg-white shadow-xl rounded-2xl max-w-full md:max-w-2xl mx-auto'>
                <div className='text-7xl text-blue-200 mb-4'>
                    <FaShoppingCart/>
                </div>
                <p className='text-2xl md:text-3xl font-semibold text-gray-700 text-center'>Your Cart is Empty!</p>
                <p className='text-gray-500 mt-2 text-center text-sm md:text-lg'>Looks like you haven't added anything to your cart yet.</p>
                <Link to={'/'} className='mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors'>
                    Start Shopping
                </Link>
            </div>
        )
        }
        
        {/* Cart Content and Summary */}
        {(data.length > 0 || loading) && (
            // Flex container defaults to column stack on small screens, then row on large screens
            <div className='flex flex-col lg:flex-row gap-8'>
                
                {/***view product (Left Side: Cart Items) */}
                <div className='w-full lg:w-2/3'>
                    {
                        loading ? (
                            // Loading Skeleton - Optimized for mobile
                            loadindCart.map((el, index) => (
                                <div key={"Add to Cart Loading"+index} className='w-full bg-white h-32 md:h-36 my-4 p-4 shadow-lg rounded-xl animate-pulse grid grid-cols-[100px,1fr] md:grid-cols-[140px,1fr] gap-4'>
                                    <div className='w-full h-full bg-gray-200 rounded-lg'></div>
                                    <div className='flex flex-col justify-between py-1'>
                                        <div className='h-4 bg-gray-200 rounded w-full mb-1'></div>
                                        <div className='h-3 bg-gray-200 rounded w-1/3 mb-2'></div>
                                        <div className='flex justify-between items-center mt-auto'>
                                            <div className='h-6 bg-gray-200 rounded w-1/4'></div>
                                            <div className='h-8 bg-gray-200 rounded w-1/4'></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Actual Cart Items - Refined for mobile
                            data.map((product)=>{
                                const itemTotal = product?.productId.sellingPrice * product?.quantity;
                                return(
                                    <div 
                                        key={product?._id} 
                                        className='w-full bg-white p-4 md:p-5 my-4 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl grid grid-cols-[100px,1fr] md:grid-cols-[140px,1fr] gap-4 relative'
                                    >
                                        
                                        {/* Delete Button */}
                                        <div 
                                            className='absolute top-3 right-3 text-blue-500 hover:text-blue-700 cursor-pointer transition-colors z-10' 
                                            onClick={()=> deleteCartProduct(product?._id)}
                                            title="Remove Item"
                                        >
                                            <IoIosCloseCircle size={24} className='md:size-7'/> 
                                        </div>
                                        
                                        {/* Product Image */}
                                        <div className='w-24 h-24 md:w-36 md:h-36 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center p-2 md:p-3'>
                                            <img 
                                                src={product?.productId?.productImage?.[0]} 
                                                className='w-full h-full object-contain mix-blend-multiply' 
                                                alt={product?.productId?.productName || "Cart Item"}
                                            />
                                        </div>
                                        
                                        {/* Product Details */}
                                        <div className='py-1 pr-8 md:pr-10 flex flex-col justify-between'>
                                            <div>
                                                <h2 className='text-lg md:text-2xl font-semibold text-gray-800 text-ellipsis line-clamp-1 mb-1'>{product?.productId?.productName}</h2>
                                                <p className='capitalize text-blue-500 font-medium text-xs md:text-sm'>{product?.productId.category}</p>
                                                <p className='text-blue-600 font-bold text-l md:text-xl'>{displayCurrency(product?.productId.sellingPrice)}</p>
                                            </div>
                                            
                                            {/* Price and Quantity - Adjusted for mobile stack/flow */}
                                            <div className='flex flex-col md:flex-row items-start md:items-end justify-between mt-3 pt-3 border-t border-gray-100'>
                                                
                                                {/* Quantity Controls */}
                                                <div className='flex items-center gap-2 mb-3 md:mb-0'>
                                                    <button 
                                                        className='p-1 border border-blue-400 text-blue-600 bg-white hover:bg-blue-600 hover:text-white w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full text-lg md:text-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed' 
                                                        onClick={()=>decreaseQty(product?._id,product?.quantity)}
                                                        disabled={product?.quantity <= 1} 
                                                        title="Decrease Quantity"
                                                    >-</button>
                                                    <span className='font-bold text-lg md:text-xl w-6 md:w-8 text-center text-gray-800'>{product?.quantity}</span>
                                                    <button 
                                                        className='p-1 border border-blue-400 text-blue-600 bg-white hover:bg-blue-600 hover:text-white w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full text-lg md:text-xl font-semibold transition-all duration-200' 
                                                        onClick={()=>increaseQty(product?._id,product?.quantity)}
                                                        title="Increase Quantity"
                                                    >+</button>
                                                </div>
                                                
                                                {/* Total Item Price */}
                                                <div className='text-left md:text-right'>
                                                    <p className='text-gray-500 text-xs md:text-sm'>Item Total</p>
                                                    <p className='text-blue-600 font-bold text-xl md:text-2xl'>{displayCurrency(itemTotal)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/**Summary (Right Side: Order Summary) - Always full width on mobile */}
                <div className='mt-5 w-full lg:w-1/3'>
                    {
                    loading ? (
                        <div className='h-56 bg-white p-6 shadow-xl rounded-2xl animate-pulse sticky top-8'>
                             <div className='h-8 bg-blue-200 w-full rounded mb-4'></div>
                             <div className='flex justify-between mb-3'>
                                 <div className='h-4 bg-gray-200 w-1/3'></div>
                                 <div className='h-4 bg-gray-200 w-1/4'></div>
                             </div>
                             <div className='flex justify-between border-t border-dashed pt-3 mb-6'>
                                 <div className='h-5 bg-gray-200 w-1/4'></div>
                                 <div className='h-5 bg-gray-200 w-1/3'></div>
                             </div>
                             <div className='h-12 bg-blue-500 w-full rounded-lg'></div>
                        </div>
                    ) : (
                        <div className='bg-white shadow-2xl rounded-2xl overflow-hidden sticky top-8 border border-gray-100'>
                            <h2 className='text-white bg-blue-600 px-6 py-4 text-xl md:text-2xl font-semibold flex items-center'>
                                <FaCreditCard className='mr-2'/>
                                Order Summary
                            </h2>
                            
                            <div className='p-6'>
                                <div className='flex items-center justify-between mb-3 pb-3'>
                                    <p className='text-gray-600 font-medium text-base md:text-lg'>Total Items</p>
                                    <p className='font-semibold text-lg md:text-xl text-gray-800'>{totalQty}</p>
                                </div>
                                
                                <div className='flex items-center justify-between py-4 border-t border-b border-dashed border-gray-200 mb-6'>
                                    <p className='text-gray-800 font-semibold text-lg md:text-xl'>Subtotal</p>
                                    <p className='text-blue-600 font-bold text-xl md:text-2xl'>{displayCurrency(totalPrice)}</p>
                                </div>

                                <button 
                                    className='flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 p-3 md:p-4 text-white w-full rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-blue-200/50 disabled:opacity-50 disabled:shadow-none'
                                    disabled={data.length === 0} 
                                >
                                    Proceed to Payment
                                </button>
                                <p className='text-xs text-gray-400 mt-3 text-center'>Taxes and shipping calculated at checkout.</p>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default Cart