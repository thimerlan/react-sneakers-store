import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ openCart, cartProducts, addToFavorite }) => {
  let priceSum = 0;
  cartProducts.forEach((el) => (priceSum += Number(el.price)));

  return (
    <>
      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center headerLeft">
          <Link className="d-flex" to={"/"}>
            <img width={40} height={40} src={"/logo.svg"} alt="logo" />
            <div className="headerTitle">
              <h3 className="text-uppercase">Store Sneakers</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </Link>
        </div>
        <ul className="headerRight">
          <li className="mr-30">
            <img
              onClick={openCart}
              width={18}
              height={18}
              style={{ cursor: "pointer" }}
              src={"assets/basket.svg"}
              alt="basket"
            />
            <span className="cartProductLength">{cartProducts.length}</span>
            <span className="ml-20">{priceSum} руб.</span>
          </li>
          <li className="mr-20">
            <NavLink to={"/Favorites"}>
              <img src={"assets/favorite.svg"} alt="favorite" />
              <span className="cartProductLength">{addToFavorite.length}</span>
            </NavLink>
          </li>
          <li>
            <Link to={"/Orders"}>
              <img src={"assets/user.svg"} alt="user" />
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
