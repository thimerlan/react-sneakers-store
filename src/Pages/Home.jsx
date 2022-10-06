import React from "react";
import Card from "../Components/Card";
import { useContext } from "react";
import AppContext from "../context";
const Home = ({
  onSearch,
  search,
  setSearch,
  products,
  onAddToCart,
  onAddToFavorite,
  cartProducts,
}) => {
  const { gotAdded, loadCart } = useContext(AppContext);
  return (
    <>
      <div className="content p-40">
        <div className="d-flex justify-between">
          <h2 className="mb-40" style={{ fontSize: "33px", color: "#222" }}>
            {search ? `Поиск по запросу : "${search}"  ` : " Все кроссовки"}
          </h2>
          <div className="search-input">
            <img src={"assets/search.svg"} alt="Search" />
            <input
              onChange={onSearch}
              value={search}
              maxLength={35}
              placeholder="Search any Sneakes.."
            />
            {search && (
              <span
                onClick={() => setSearch("")}
                className="cu-p clearInput"
                style={{ width: "10px", background: "transparent" }}
              >
                &#10008;
              </span>
            )}
          </div>
        </div>
        <div className="sneakers d-flex flex-wrap">
          {products
            .filter((items) => items.name.toLowerCase().includes(search))
            .map((item, index) => (
              <Card
                products={products}
                key={item.id}
                id={item.id}
                
                {...item}
                onAddToCart={(prod) => onAddToCart(prod)}
                onAddToFavorite={(prod) => onAddToFavorite(prod)}
                cartAdded={gotAdded(item && item.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
