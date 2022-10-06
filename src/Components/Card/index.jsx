import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "./Card.module.scss";
import AppContext from "../../context";
import { useContext } from "react";
import { DotLoader } from "react-spinners";
import ContentLoader from "react-content-loader";
// import unchecked from "../../assets/plus.svg";
// import checked from "../../assets/btn-checked.svg";
// import heartUnliked from "../../assets/heartUnliked.svg";

const Card = ({
  id,
  image,
  name,
  price,
  onAddToCart,
  onAddToFavorite,
  fav = false,
  Purchased,
  //   cartAdded = true,
  //   products,
}) => {
  //   const [addToBasket, setAddToBasket] = React.useState(cartAdded);
  const [isFavorite, setIsFavorite] = useState(fav);
  const [animeProd, setAnimeProd] = useState(false);
  const { gotAdded, loadCart, loadFav } = useContext(AppContext);

  const obj = { id, parentId: id, image, name, price };
  const onClickBasket = () => {
    onAddToCart(obj);

    // console.log(id);
  };
  const onClickFavorite = () => {
    onAddToFavorite(obj);
    setIsFavorite(!isFavorite);
    // console.log(id);
  };
  setTimeout(() => {
    setAnimeProd(true);
  }, 1111);

  return (
    <>
      {!animeProd ? (
        <div className="skelet">
          <ContentLoader
            speed={1}
            width={336}
            height={230}
            viewBox="0 0 635 460"
            backgroundColor="#9dc3bd"
            foregroundColor="#e9d8d8"
          >
            <rect x="282" y="48" rx="0" ry="0" width="1" height="11" />
            <rect x="91" y="45" rx="0" ry="0" width="330" height="154" />
            <rect x="93" y="235" rx="0" ry="0" width="192" height="21" />
            <rect x="91" y="276" rx="0" ry="0" width="182" height="22" />
            <rect x="204" y="287" rx="0" ry="0" width="25" height="1" />
            <rect x="93" y="315" rx="0" ry="0" width="139" height="18" />
            <circle cx="396" cy="244" r="21" />
            <rect x="370" y="287" rx="0" ry="0" width="47" height="9" />
          </ContentLoader>
        </div>
      ) : (
        <>
          <AnimatePresence initial={false} exitBeforeEnter={false}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
              className={styled.card}
            >
              <div className={styled.favorite}>
                {loadFav ? (
                  <DotLoader size={30} color="rgba(168, 14, 14, 0.298)" />
                ) : (
                  <>
                    {onAddToFavorite ? (
                      <img
                        onClick={() => onClickFavorite()}
                        src={
                          isFavorite
                            ? "assets/heartliked.svg"
                            : "assets/heartUnliked.svg"
                        }
                        alt={isFavorite ? "Liked" : "Unliked"}
                        style={{
                          boxShadow:
                            " 0px 0px 2px 2px  rgba(168, 14, 14, 0.298)",
                          borderRadius: "2ex",
                        }}
                      />
                    ) : (
                      <p className={styled.purchased}>
                        <span>{Purchased}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
              <img width={133} height={122} src={image} alt="" />
              <h5>{name}</h5>
              <div className="d-flex justify-between">
                <div className="d-flex flex-column ">
                  <span className={styled.cost}>Цена</span>
                  <b>{price} руб.</b>
                </div>
                <button
                  onClick={() => onClickBasket()}
                  className={styled.btnPlus}
                >
                  {loadCart ? (
                    <DotLoader size={30} color="#05ecbe" />
                  ) : (
                    onAddToCart && (
                      <img
                        src={
                          gotAdded(id)
                            ? "assets/btn-checked.svg"
                            : "assets/plus.svg"
                        }
                        alt="addCart"
                      />
                    )
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Card;
