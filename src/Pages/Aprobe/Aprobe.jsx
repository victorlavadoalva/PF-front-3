import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const Aprobe = () => {
  return (
    <div className={styles.contenedor}>
      <div>
        <h1>Aprobe transaction</h1>
        <h2> Muchas gracias por su compra! </h2>
      </div>
      <div className={styles.divButton}>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};
