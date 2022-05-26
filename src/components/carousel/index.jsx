import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { Carousel as CS } from 'react-responsive-carousel'

const Carousel = ({ imgs }) => {

    
    // const navigate = useNavigate()

  return (
    <div className={styles.carousel_wrapper}>
        <CS autoPlay transitionTime="1000" showThumbs={false} infiniteLoop dynamicHeight>
            {
                imgs.map((img, i) => {
                    if(typeof img === 'object') return(
                        <div key={i} className = {styles.img_wrapper}>
                            <img src={img.url} alt = "" className={styles.carousel_img} />
                            <p className="legend">{img.legend}</p>
                        </div>
                    )

                    return <div className={styles.img_wrapper}><img src={img.img} className = {styles.carousel_img} alt = "" /></div>
                })
            }
        </CS>
    </div>
  )
}

export default Carousel