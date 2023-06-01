import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export default function CardFilter_Landing({ id, image, name }) {
  return (
    <Link
      to={`/home/detail/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          {image[0] ? (
          <img src={image[0]} alt={name} />
          ) : (
          <p style ={{color:"white"}}>Image not found</p>
          )}
          
        </div>
        <div className={styles.containerTitle}>
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  );
}
