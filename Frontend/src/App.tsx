
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Homepage from './pages/Homepage'
// import Userprofile from './components/Userprofile'
import Authcallbackpage from './pages/Authcallbackpage'
import Userprofilepage from './pages/Userprofilepage'
import ProtectRoute from './auth/ProtectRoute'
import Restaurantpage from './pages/Restaurantpage'
import Searchpage from './pages/Searchpage'
import Detailpage from './pages/Detailpage'
import OrderStatusPage from './pages/OrderStatusPage'
// import layout from './layout/Layout'


function App() {


  return (


    <Routes>
      <Route path='/' element={<Layout showhero><Homepage /></Layout>} />
      <Route path='/auth-callback' element={<Authcallbackpage />} />
      <Route path='/search/:city' element={<Layout showhero={false}><Searchpage /></Layout>} />
      <Route path='/details/:restaurantId' element={<Layout showhero={false}><Detailpage /></Layout>} />
      <Route element={<ProtectRoute />}>
        <Route path='/order-status' element={<Layout><OrderStatusPage /></Layout>} />
        <Route path='/user-profile' element={<Layout><Userprofilepage /></Layout>} />
        <Route path='/manage-restaurant' element={<Layout><Restaurantpage /></Layout>} />
      </Route>

    </Routes>



  )
}

export default App
