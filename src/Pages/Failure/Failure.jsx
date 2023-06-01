import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const Failure = () =>{
    return(
        <div className={styles.contenedor}>
           <div>
            <h1>Failed transaction</h1>
            </div> 
            <div className={styles.divButton}>
                <Link to="/home">
                <button>
                    Home
                </button>
                </Link>
            </div>
        </div>
    )
}