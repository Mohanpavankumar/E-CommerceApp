import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './EndPoints/index';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    try {
        const dataResponse = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: "include",
        });

        if (!dataResponse.ok) {
            console.error("Error fetching user details:", dataResponse.status, dataResponse.statusText);
            return;
        }

        const dataApi = await dataResponse.json();

        if(dataApi.success){
          dispatch(setUserDetails(dataApi.data))
        }

        // console.log("data-user", dataApi);
    } catch (error) {
        console.error("Error in fetchUserDetails:", error);
    }
};

const fetchUserAddToCart = async() =>{
  const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    })
    
  const dataApi = await dataResponse.json();

  setCartProductCount(dataApi.data?.count)
}


  useEffect(() =>{
    /* User Details */
    fetchUserDetails()
    /* User Details Cart Product */
    fetchUserAddToCart()
  },[])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, //fetching user details
        cartProductCount,  //current user add to cart product count
        fetchUserAddToCart
      }}>
        <ToastContainer 
        position='top-center'
        />
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
