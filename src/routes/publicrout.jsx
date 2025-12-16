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
import ConfirmEmail from '../pages/emailconfirm'
import SellerApplication from '../components/SelletApplication'
import SellerProtected from './sellerProtected'
import OrderDetail from '../pages/ordersdetailed'
import SellerDashboard from '../sellerpanel/sellerDashboard'
import SellerProducts from '../sellerpanel/sellerproducts'
import SellerOrders from '../sellerpanel/sellerOrders'
import SellerEarnings from '../sellerpanel/sellerearnongs'
import SellerLayout from '../sellerpanel/sellerLayout'
import SellerOrderDetail from '../sellerpanel/sellerorderDetailed'
import SellerCreateProduct from '../sellerpanel/addproducts'
import SellerProductDetail from '../sellerpanel/productdetailed'

function Publicrout() {
  return (
    <Routes>

        
        <Route path='/' element={<Home/>}/>
        <Route element={<Layout/>}>
        <Route path="/seller-application" element={<Protected><SellerApplication/></Protected>} />

        <Route element={<AdminorUser/>}>

        <Route path='/collection' element={<Collection/>}>
               <Route index element={<Allproducts/>} />
                <Route path=":categorySlug" element={<Allproducts/>} />
        </Route>
        <Route path='/product/:slug' element={<ProductDitails/>}/>
        <Route path='/cart' element={<Cart/>}/>

        <Route element={<Protected/>}>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/orders' element={<Orders/>}/>  
            <Route path='/wishlist'  element={<Wishdetails/>}/>

        </Route>
        <Route path="/support" element={<Support />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        

        </Route>

        </Route>
        <Route element={<Nonelogrout/>}>
            <Route path='/email-confirm/:key' element={<ConfirmEmail/>}/>
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
        <Route element={<SellerProtected/>}>
             <Route path="/seller" element={<SellerLayout />}>
                <Route path="dashboard" element={<SellerDashboard />} />
                <Route path="products" element={<SellerProducts />} />
                <Route path="products/:slug" element={<SellerProductDetail />} />

                <Route path="products/create/" element={<SellerCreateProduct />} />
                
                <Route path="orders" element={<SellerOrders />} />
                <Route path="orders/:id" element={<SellerOrderDetail />} />
                <Route path="earnings" element={<SellerEarnings />} />
            </Route>
        </Route>
        <Route path="*" element={<Notfound />} />

      
        
    </Routes>

    
  )
}

export default Publicrout