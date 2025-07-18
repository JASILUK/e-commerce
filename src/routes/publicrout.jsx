import React from 'react'
import{Route,Router,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Collection from '../pages/Collection'
import ProductDitails from '../pages/ProductDitails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Protected from './Protected'
import Men from '../pages/Men'
import Kid from '../pages/Kid'
import Women from '../pages/Women'
import Allproducts from '../pages/Allproducts'
import Support from '../pages/Support'
import Orders from '../pages/Order'
import Nonelogrout from './Nonelogrout'
import Wishdetails from '../pages/Wishdetails'
import Layout from '../layout/Layout'
import Adminprotected from './Adminprotected'
import Adminlayout from '../adminpanel/Adminlayout'
import ManageOrder from '../adminpanel/ManageOrder'
import Managproduct from '../adminpanel/Managproduct'
import Manageuser from '../adminpanel/Manageuser'
import Admindashboard from '../adminpanel/Admindashboard'
import AdminorUser from './AdminorUser'
import Productcollection from '../adminpanel/Productcollection'
import Productadd from '../adminpanel/Productadd'
import Manageuserdetails from '../adminpanel/Manageuserdetails'
import Notfound from '../pages/Notfound'

function Publicrout() {
  return (
    <Routes>

        
        <Route path='/' element={<Home/>}/>
        <Route element={<Layout/>}>
        <Route element={<AdminorUser/>}>
        <Route path='/collection' element={<Collection/>}>
              <Route index element={<Allproducts/>}/>
              <Route path='men' element={<Men/>}/>
              <Route path='women' element={<Women/>}/>
              <Route path='kids' element={<Kid/>}/>
        </Route>
        <Route path='/product/:userid' element={<ProductDitails/>}/>
        <Route element={<Protected/>}>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/orders' element={<Orders/>}/>  
            <Route path='/wishlist'  element={<Wishdetails/>}/>
        </Route>
        <Route path="/support" element={<Support />} />
        <Route path="/orders" element={<Orders />} />
        
        </Route>

        </Route>
        <Route element={<Nonelogrout/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Route>
        
        <Route element={<Adminprotected/>}>
            <Route path='/admin' element={<Adminlayout/>}>
                <Route path='dashboard' element={<Admindashboard/>}/>
                <Route path='product' element={<Managproduct/>}>
                    <Route index element={<Productcollection/>}/>
                    <Route path='add' element={<Productadd/>}/>
                    <Route path='add/:ID' element={<Productadd/>}/>
                </Route>
                <Route path='orders' element={<ManageOrder/>}/>
                <Route path='users' element={<Manageuser/>}/>
                <Route path='users/:id' element={<Manageuserdetails/>}/>
                
                
            </Route>
        </Route>
        <Route path="*" element={<Notfound />} />

      
        
    </Routes>

    
  )
}

export default Publicrout