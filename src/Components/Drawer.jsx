import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";
import { useContext } from "react";
import AppContext from "../context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Drawer = ({
  openBasket,
  setOpenBasket,
  onRemoveItem,
  cartProducts = [],
}) => {
  let sumProd = 0;
  const wholeSum = cartProducts.forEach(
    (el) => (sumProd += Number.parseFloat(el.price))
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [load, setLoad] = useState(false);
  const { setCartProducts } = useContext(AppContext);

  const onClickToOrder = async () => {
    setLoad(true);
    try {
      const { data } = await axios.post(
        "https://6307906146372013f56c0c91.mockapi.io/Orders",
        {
          products: cartProducts,
        }
      );
      setOrderId(data.id);
      setLoad(false);
      setIsCompleted(true);
      setCartProducts([]);

      for (let i = 0; i < cartProducts.length; i++) {
        const item = cartProducts[i];
        await axios.delete(
          "https://6307906146372013f56c0c91.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
      //   cartProducts.forEach((item) => {
      //     axios.delete(
      //       "https://6307906146372013f56c0c91.mockapi.io/cart/" + item.id
      //     );
      //   });
      //   await axios.put("https://6307906146372013f56c0c91.mockapi.io/cart", []);
    } catch (error) {
      alert("Error To order!");
    }
  };
  const coolClose = () => {
    setOpenBasket(!openBasket);
    setIsCompleted(false);
  };
  return (
    <div
      onClick={() => setOpenBasket(!openBasket)}
      className={openBasket ? "overlay" : "unoverlay"}
    >
      <div onClick={(e) => e.stopPropagation()} className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={() => {
              setOpenBasket(false);
            }}
            className="removeBtn  cu-p"
            src={"assets/btn-remove.svg"}
            alt="Remove"
          />
        </h2>
        <div className="items">
          <AnimatePresence initial={false} exitBeforeEnter={false}>
            {cartProducts.length ? (
              cartProducts.map((products, index) => (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
                  key={index}
                  className="cartItem d-flex align-center mb-20"
                >
                  <img
                    className="mr-15"
                    width={70}
                    height={70}
                    src={products.image}
                    alt="sneakers"
                  />
                  <div className="mr-20">
                    <p className="mb-5">{products.name}</p>
                    <b>{products.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemoveItem(products.id)}
                    className="removeBtn"
                    src={"assets/btn-remove.svg"}
                    alt="Remove"
                  />
                </motion.div>
              ))
            ) : (
              <>
                <div className="emptyCart">
                  <img
                    src={
                      isCompleted ? "/assets/Order.png" : "/assets/empty.jpg"
                    }
                    alt="emptyImg"
                    className="asd"
                  />
                  <div className="emtypBody">
                    <h2>
                      {isCompleted ? "Заказ оформлен!" : "Корзина пустая"}
                    </h2>
                    <h3>
                      {isCompleted
                        ? `Ваш заказ  #${orderId}  скоро будет передан курьерской доставке`
                        : " Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                    </h3>
                    <button onClick={coolClose} className="greenBtn">
                      <img src={"assets/arrow.svg"} alt="" />
                      Вернуться назад
                    </button>
                  </div>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>

        {cartProducts.length ? (
          <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{sumProd}руб. </b>
              </li>
              <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>{Math.round((sumProd / 100) * 5)} руб. </b>
              </li>
            </ul>
            <button onClick={onClickToOrder} className="greenBtn">
              {load ? (
                <>
                  <BeatLoader color="#00ff66" />
                </>
              ) : (
                <>
                  Оформить заказ
                  <img src={"assets/arrow.svg"} alt="" />
                </>
              )}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Drawer;
