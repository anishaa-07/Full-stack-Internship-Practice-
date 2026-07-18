
import { Route, Routes } from "react-router";
import "./App.css"
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";
import ProdutPage from "./pages/ProductPage";
import About from "./pages/About";







function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProdutPage />} />
        <Route path="/about-us" element={<About />} />
        {/* <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/contact-us" element={<ContactPage />} /> */}
      </Routes>
      <Footer />
    </>
    //React fragments
  )

}


export default App;
