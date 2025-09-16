import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"}  heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"earphones"}  heading={"Popular Earphones"}/>
      <HorizontalCardProduct category={"watches"}  heading={"Top's Watches"}/>

      <VerticalCardProduct category={"mobiles"}  heading={"Top's Mobiles"}/>
      <VerticalCardProduct category={"Mouse"}  heading={"Top's Mouses"}/>
      <VerticalCardProduct category={"televisions"}  heading={"Top's Televisions"}/>
      <VerticalCardProduct category={"camera"}  heading={"Top's Photography"}/>
      <VerticalCardProduct category={"printers"}  heading={"Top's Printers"}/>
      <VerticalCardProduct category={"processor"}  heading={"Top's Processors"}/>
      <VerticalCardProduct category={"speakers"}  heading={"Top's speakers"}/>
      <VerticalCardProduct category={"refrigerator"}  heading={"Top's Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"}  heading={"Top's trimmers"}/>
    </div>
  )
}

export default Home