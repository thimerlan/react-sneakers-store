import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Card from "../Components/Card";
import styled from "./Favorites.module.scss";
import AppContext from "../context";
import { DotLoader } from "react-spinners";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { onAddToFavorite } = useContext(AppContext);
  const [bla, setBla] = useState(false);
  useEffect(() => {
    try {
      async function fetchOrderData() {
        const { data } = await axios.get(
          "https://6307906146372013f56c0c91.mockapi.io/Orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.products], []));
      }
      fetchOrderData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(orders);
  return (
    <>
      {orders.length ? (
        <>
          <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
              <h2>Мои заказы</h2>
            </div>
          </div>
          <div className="d-flex flex-wrap p-20">
            {orders.map((item, index) => (
              <Card key={index} {...item} Purchased={"Purchased !"} />
            ))}
          </div>
        </>
      ) : (
        <>
          {!orders.length && (
            <div className={styled.emptyFavo}>
              <img src="/assets/orderEmpty.png" alt="" />
              <h2 className={styled.title}>У вас нет заказов :(</h2>
              <p className={styled.descr}>Оформите хотя бы один заказ.</p>
              <Link to={"/"}>
                <button className={styled.greenBtn}>
                  <img src={"assets/arrow.svg"} alt="" />
                  Вернуться назад
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
