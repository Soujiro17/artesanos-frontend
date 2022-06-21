import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPublic } from "../../services/axios";
import ListarHeader from "../listarHeader";
import styles from "./styles.module.scss";

/* 
    Agregar media query para mostrar los nombres de los artesanos
    en mobile 
  */

const initialDataState = {
  docs: [],
  totalDocs: 0,
  totalPages: 0,
  hasPrevPage: null,
  hasNextPage: null,
  prevPage: 0,
  page: 0,
  nextPage: 0,
};

const Listar = ({ filtros: Filtros, title, path = "", endpoint }) => {
  const [data, setData] = useState(initialDataState);

  const [searchParams] = useSearchParams();
  const subTitle = searchParams.get("id");
  const navigate = useNavigate()

  const handlePages = async (value) => {
    
    await axiosPublic
      .get(`/${endpoint}?page=${value}${subTitle? `&id=${subTitle}` : ''}`)
      .then((res) => setData(res.data))
      .catch((err) =>
        toast.error("Error al cambiar de página, vuelve a intentarlo más tarde")
      );

    navigate(`?page=${value}`)
  };

  useEffect(() => {

    const controller = new AbortController()
    async function getResources() {
      await axiosPublic
        .get(`/${endpoint}${subTitle? `?id=${subTitle}` : ''}`, { signal: controller.signal})
        .then((res) => setData(res.data))
        // .catch((err) => toast.error(`Error al obtener los recursos: ${err.message}`));
    }
    getResources();
    return () => controller.abort()
  }, []);

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
          {data?.docs?.length > 0 ? (
            data?.docs.map((doc, i) => (
              <Link
                to={`${path}${doc.url?.toLowerCase() || `${doc._id}?name=${doc.nombre}`}`}
                className={styles.item_link}
                key={doc._id || i}
              >
                <img
                  src={doc.picture_url || "/img/not_found_default.jpg"}
                  className={styles.item_img}
                  alt=""
                />
                <div className={styles.item_name}>{doc.nombre}</div>
              </Link>
            ))
          ) : (
            <p className="error">No hay elementos para mostrar</p>
          )}
        </div>
        <div className={styles.paginas}>
          {data.hasPrevPage ? (
            <div
              className={styles.pagina}
              onClick={() => handlePages(data.prevPage)}
            >
              {data.prevPage}
            </div>
          ) : null}
          <div className={`${styles.pagina} ${styles.current}`}>
            {data.page || 1}
          </div>
          {data.hasNextPage ? (
            <div
              className={styles.pagina}
              onClick={() => handlePages(data.nextPage)}
            >
              {data.nextPage}
            </div>
          ) : null}
          {data.totalPages > 3 ? (
            <>
              ...
              <div className={styles.pagina} onClick={() => handlePages(data.totalPages)}>{data.totalPages}</div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Listar;
