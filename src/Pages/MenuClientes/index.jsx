import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../Components/Cart';
import PaginationRounded from "../../Components/Paginado";
import { getRestorants } from "../../Redux/actions";
import styles from "./styles.module.css";

export default function MenuCliente() {

  const {restorants} = useSelector(state => state);
  const dispatch = useDispatch();
  const [searchName] = useState("")

  useEffect(() => {
    if (searchName){
      dispatch(getRestorants({ searchName }));
    }   
  }, [dispatch, searchName]);
  
  useEffect(() => {
    if (!restorants.documents) dispatch(getRestorants({}));
  }, [dispatch, restorants.documents, restorants.length]);

  return (
    <div className={styles.menu}>
      {/* Hay que chequear que muestre la cantidad de paginas dependiendo la cantidad de menu */}
      <div className={styles.paginate}>
        
      </div>
      {/* Es una prueba para renderizar las cards de los platos */}
      <Cart />
    </div>
  );
};