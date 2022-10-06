import "./App.scss";

import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";

// ==========================
import React, { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";

import AppContext from "./context";
import Orders from "./Pages/Orders";

function App() {
  const [openBasket, setOpenBasket] = useState(false);
  const [search, setSearch] = useState("");
  const [addToFavorite, setAddToFavorite] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadCart, setLoadCart] = useState(false);
  const [loadFav, setLoadFav] = useState(false);
  const [animeProd, setAnimeProd] = useState(false);
  useEffect(() => {
    async function fetchAllData() {
      try {
        const [cartRes, favoriteRes, productsRes] = await Promise.all([
          axios.get("https://6307906146372013f56c0c91.mockapi.io/cart"),
          axios.get("https://6307906146372013f56c0c91.mockapi.io/favorite"),
          axios.get("https://6307906146372013f56c0c91.mockapi.io/products"),
        ]);
        // const cartRes = await axios.get(
        //   "https://6307906146372013f56c0c91.mockapi.io/cart"
        // );
        // const favoriteRes = await axios.get(
        //   "https://6307906146372013f56c0c91.mockapi.io/favorite"
        // );
        // const productsRes = await axios.get(
        //   "https://6307906146372013f56c0c91.mockapi.io/products"
        // );
        setProducts(productsRes.data);
        setCartProducts(cartRes.data);
        setAddToFavorite(favoriteRes.data);
        setAnimeProd(true);
      } catch (error) {
        alert("Good Error!");
      }
    }

    fetchAllData();
  }, []);

  const openCart = () => {
    setOpenBasket(true);
  };
  const onAddToCart = async (prod) => {
    setLoadCart(true);
    try {
      const findPord = cartProducts.find(
        (item) => Number(item.parentId) === Number(prod.id)
      );
      if (findPord) {
        setCartProducts((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(prod.id))
        );
        setLoadCart(false);
        await axios.delete(
          `https://6307906146372013f56c0c91.mockapi.io/cart/${Number(
            findPord.id
          )}`
        );
        setLoadCart(false);
      } else {
        const { data } = await axios.post(
          "https://6307906146372013f56c0c91.mockapi.io/cart",
          prod
        );
        setCartProducts((prev) => [...prev, data]);
        setLoadCart(false);
      }
    } catch (error) {
      console.error("ERRROOORR!");
    }
  };
  const onAddToFavorite = async (prod) => {
    setLoadFav(true);
    try {
      if (addToFavorite.find((favProd) => favProd.id == prod.id)) {
        setAddToFavorite((prev) => prev.filter((item) => item.id !== prod.id));
        setLoadFav(false);
        await axios.delete(
          `https://6307906146372013f56c0c91.mockapi.io/favorite/${prod.id}`
        );
        setLoadFav(false);
      } else {
        const { data } = await axios.post(
          "https://6307906146372013f56c0c91.mockapi.io/favorite",
          prod
        );

        setAddToFavorite((prev) => [...prev, data]);
        setLoadFav(false);
      }
    } catch (error) {
      alert("Не удалось добавить в Favorites");
    }
  };
  const onRemoveItem = async (ProdId) => {
    console.log(ProdId);
    try {
      setCartProducts((prev) =>
        prev.filter((item) => Number(item.id) !== Number(ProdId))
      );
      await axios.delete(
        `https://6307906146372013f56c0c91.mockapi.io/cart/${ProdId}`
      );
    } catch (error) {
      alert("Error to delete item !");
    }

    // console.log(ProdId);
  };

  const onSearch = (event) => {
    setSearch(event.target.value);
  };
  function gotAdded(id) {
    return cartProducts.some((thing) => Number(thing.parentId) === Number(id));
  }
  return (
    <AppContext.Provider
      value={{
        products,
        setCartProducts,
        cartProducts,
        addToFavorite,
        gotAdded,
        onAddToFavorite,
        onAddToCart,
        loadCart,
        loadFav,
      }}
    >
      <div className="wrapper clear">
        <Header
          cartProducts={cartProducts}
          addToFavorite={addToFavorite}
          openCart={openCart}
        />
        <Drawer
          onRemoveItem={onRemoveItem}
          products={products}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          setOpenBasket={setOpenBasket}
          openBasket={openBasket}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartProducts={cartProducts}
                search={search}
                onAddToFavorite={onAddToFavorite}
                addToFavorite={addToFavorite}
                onSearch={onSearch}
                setSearch={setSearch}
                products={products}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route
            path="/Favorites"
            element={
              <Favorites
                // addToFavorite={addToFavorite}
                onAddToCart={onAddToCart}
                setAddToFavorite={setAddToFavorite}
                onAddToFavorite={(prod) => onAddToFavorite(prod)}
              />
            }
          />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
/**
[
 {
  "id": "1",
  "image": "assets/sneakers/1.jpg",
  "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  "price": "11 599"
 },
 {
  "id": "2",
  "image": "assets/sneakers/2.jpg",
  "name": "Мужские Кроссовки Nike Air Max 270",
  "price": "12 699"
 },
 {
  "id": "3",
  "image": "assets/sneakers/3.jpg",
  "name": "Мужские Кроссовки Nike Blazer Mid Suede",
  "price": "8 499"
 },
 {
  "id": "4",
  "image": "assets/sneakers/4.jpg",
  "name": "Кроссовки Puma X Aka Boku Future Rider",
  "price": "8 799"
 },
 {
  "id": "5",
  "image": "assets/sneakers/5.jpg",
  "name": "Мужские Кроссовки Under Armour Curry",
  "price": "15 199"
 },
 {
  "id": "6",
  "image": "assets/sneakers/6.jpg",
  "name": "Мужские Кроссовки Nike Kyrie 7",
  "price": "11 299"
 },
 {
  "id": "7",
  "image": "assets/sneakers/7.jpg",
  "name": "Мужские Кроссовки Jordan Air Jordan 11",
  "price": "10 799"
 },
 {
  "id": "8",
  "image": "assets/sneakers/8.jpg",
  "name": "Мужские Кроссовки Nike LeBron XVIII",
  "price": "16 499"
 },
 {
  "id": "9",
  "image": "assets/sneakers/9.jpg",
  "name": "Мужские Кроссовки Nike Lebron XVIII Low",
  "price": "13 599"
 },
 {
  "id": "10",
  "image": "assets/sneakers/10.jpg",
  "name": "Мужские Кроссовки Nike Kyrie Flytrap IV",
  "price": "11 399"
 },
 {
  "id": "11",
  "image": "assets/sneakers/1.jpg",
  "name": "Мужские Кроссовки Under Armour Curry 8V",
  "price": "15 199"
 },
 {
  "id": "12",
  "image": "assets/sneakers/3.jpg",
  "name": "Мужские Кроссовки Jordan Air Jordan 11",
  "price": "10 799"
 }
]
   */
