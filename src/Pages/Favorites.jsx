import React, { useContext } from "react";

import { Link } from "react-router-dom";
import styled from "./Favorites.module.scss";
import Card from "../Components/Card";
import AppContext from "../context";
const Favorites = ({ onAddToFavorite }) => {
  const { addToFavorite } = useContext(AppContext);

  return (
    <>
      {addToFavorite.length ? (
        <section className="Favorites">
          <div className="content p-40">
            <div className="d-flex align-center ">
              <Link className={styled.favoritesLink} to={"/"}>
                &lt;
              </Link>
              <h2>Мои закладки</h2>
            </div>
            <div className="sneakers d-flex flex-wrap">
              {addToFavorite.map((item, index) => (
                <Card
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  addToFavorite={addToFavorite}
                  onAddToFavorite={onAddToFavorite}
                  fav={true}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className={styled.emptyFavo}>
          <img src="/assets/cry.png" alt="" />
          <h2 className={styled.title}>Закладок нет :(</h2>
          <p className={styled.descr}>Вы ничего не добавляли в закладки</p>
          <Link to={"/"}>
            <button className={styled.greenBtn}>
              <img src={"assets/arrow.svg"} alt="" />
              Вернуться назад
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Favorites;
