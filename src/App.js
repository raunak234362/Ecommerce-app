// Importing necessary components and functions
import Nav from "./Component/Nav";
import ProductDetail from "./Component/ProductDetail";
import AddProduct from "./Component/AddProduct";
import CartItems from "./Component/CartItems";
import ProductItemList from "./Component/ProductItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./actions/index";
import customFetch from "./apiCall";
import { useEffect } from "react";

// Defining the main App component
function App() {
  // Selecting the product detail item from the Redux store
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  // Define the URL for the API call
  const url = "https://my-json-server.typicode.com/raunak234362/data/db";

  
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  
  // Use useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Make an API call using customFetch function
    let response = customFetch(url, {
      method: "GET",
    });
    // Process the response
    response.then((data) => {
      // Modify the data if needed
      let modifiedData = data.products.map((item) => {
        item.edit = true;
        return item;
      });
      // Store the modified data in localStorage
      window.localStorage.setItem("products", JSON.stringify(modifiedData));
      // Get the stored products from localStorage and dispatch an action to update the Redux store
      let products = JSON.parse(window.localStorage.getItem("products"));
      dispatch(addproducts(products));
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
