import React from "react";
import Section from "../section";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const imgUrl =
  "https://www.abaenglish.com/es/wp-content/uploads/sites/2/2019/07/artesano-en-taller.jpg";

const SectionCategories = () => {
  const { categorias } = useAuth();

  return (
    <Section name="CATEGORÍAS">
      <div className={styles.header}>
        <p>Categorías (de la A-Z)</p>
      </div>
      <div className={styles.content}>
        {categorias.categorias.length > 0 ? (
          categorias.categorias.map((categoria) => (
            <Link
              to={`/categoria?name=${categoria.nombre.toLowerCase()}`}
              className={styles.categoria_wrapper}
              key={categoria._id}
            >
              <img
                src={categoria.picture || '/img/not_found_default.jpg'}
                alt=""
                className={styles.categoria_img}
              />
              <div className={styles.categoria_nombre}>{categoria.nombre}</div>
            </Link>
          ))
        ) : (
          <p className="error">No hay categorías para mostrar</p>
        )}
      </div>
      <footer className={styles.footer}>
        <p className={styles.search}>Buscar</p>
        <div className={styles.search_group}>
          <input placeholder="Categoría" className="input" />
          <button className={styles.margin + " btn"}>Buscar</button>
        </div>
      </footer>
    </Section>
  );
};

export default SectionCategories;
