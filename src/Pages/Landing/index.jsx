import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardFilter_Landing from "../../Components/CardFilterLanding";
import CardLanding from "../../Components/CardLanding";
import { getRestorants, getRestorantFilter } from "../../Redux/actions";
import { props } from "../../dataHardcodeo/constants";
import Carousel from "./Carrusel";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import Login_Register from "../../Components/Login";
// import {RESTOS} from "../../dataHardcodeo/constants" "No borrar, data de prueba"
function Landing() {
  const { restorants, filter_landing } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const [filterActivate, setFilterActivate] = useState(false);
  const [valueFilter, setValueFilter] = useState(null);



  useEffect(() => {
    if (!restorants.documents) dispatch(getRestorants({}));
  }, [dispatch, restorants.documents, restorants.length]);

  const dataFilter = filter_landing.slice(0, 5)

  const handleChangeValue = (event) => {
    if (valueFilter === null) {
      setValueFilter(event);
      setFilterActivate(true);
    } else if (valueFilter !== event) {
      setValueFilter(event);
      setFilterActivate(true);
    } else if (valueFilter === event) {
      setValueFilter(null);
      setFilterActivate(false);
    }
  };

  useEffect(() => {
    if(valueFilter){
      dispatch(getRestorantFilter(valueFilter));

    }
  }, [valueFilter]);
console.log(filter_landing);
  return (
    <>
      {location.pathname === "/" && (
        <div className={styles.container}>
          <div className={styles.containerContent}>
            <div className={styles.containerTitle}>
              <h1>Bienvenido a FoodBook </h1>
            </div>
            <div className={styles.divLink}>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <button className={styles.button}>Explorar</button>
              </Link>
            </div>
            <div className={styles.popularCards}>
              <h3 className={styles.category}>Popular Category</h3>
            </div>
            <div className={styles.containerCards}>
              {props.map((el) => (
                <CardLanding
                  key={el.id}
                  className={styles.CardPopular}
                  image={el.image}
                  name={el.name}
                  value={valueFilter}
                  onChange={handleChangeValue}
                />
              ))}
            </div>
            {filterActivate && (
              <div className={styles.containerFilter}>
                <div className={styles.containerCardsFilter}>
                  {dataFilter ? (
                    dataFilter.map((el) => (
                      
                        <CardFilter_Landing
                          // className={styles.CardPopular}
                          key={el._id}
                          image={el.images}
                          name={el.name}
                          id={el._id}
                        />
                      
                    ))
                  ) : (
                    <div className={styles.container_londing}>
                      <div className={styles.dot_spinner}>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                        <div className={styles.dot_spinner__dot}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={styles.containerImg}>
            <div className={styles.elementDesing}></div>
            <div className={styles.LoginRegister}>
              <Login_Register />
            </div>
            <div className={styles.container_carousel}>
              <Carousel />
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Landing;
