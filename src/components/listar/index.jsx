import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListarHeader from "../listarHeader";
import styles from "./styles.module.scss";

const Listar = ({ filtros: Filtros, title, data, path = "", total }) => {
  /* 
    Agregar media query para mostrar los nombres de los artesanos
    en mobile 
  */

  const [searchParams] = useSearchParams();

  const subTitle = searchParams.get("id");

  return (
    <>
      {title && <ListarHeader title={subTitle || title} />}
      <div className={styles.listar}>
        {Filtros && (
          <div className={styles.filtros}>
            <Filtros />
          </div>
        )}
        <div className={styles.items}>
          {data?.length > 0 ? (
            data.map((dataItem, i) => (
              <Link
                to={`${path}${dataItem.url || dataItem.nombre}`}
                className={styles.item_link}
                key = {data._id || i}
              >
                <img
                  src={dataItem.picture_url || "/img/not_found_default.jpg"}
                  className={styles.item_img}
                  alt=""
                />
                <div className={styles.item_name}>{dataItem.nombre}</div>
              </Link>
            ))
          ) : (
            <p className="error">No hay elementos para mostrar</p>
          )}
        </div>
        <div className={styles.paginas}>
          <div className={styles.pagina}>1</div>
          <div className={styles.pagina}>2</div>
          <div className={styles.pagina}>3</div>
          <div className={styles.pagina}>4</div>
        </div>
      </div>
    </>
  );
};

export default Listar;
