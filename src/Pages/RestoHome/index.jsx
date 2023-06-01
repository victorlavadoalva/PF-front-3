import { useSelector, useDispatch } from 'react-redux';
import { CardDish } from '../../Components/CardDish';
import { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import * as actions from '../../Redux/actions';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import { FOOD } from '../../dataHardcodeo/constants'

export default function Home() {

  // let plates = FOOD;
  const { dishes } = useSelector(state => state);
  console.log("dishes", dishes[0]);
  const [isActive, setIsActive] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const restDataStorage = window.localStorage.getItem("UserLogVerificate");
  const restData = JSON.parse(restDataStorage);
  const restId = restData.id;
  console.log("Rest id", restId);

  let isRestorant = false;
  pathname === "/restorant" ? isRestorant = true : isRestorant = false;

  useEffect(() => {
    dispatch(actions.getDish(restId))
  }, [dispatch, isActive, restId])
  const editMenu = () => {
  }

  const removeFromMenu = (id) => {
    // const dish = plates.find(dish => dish._id === id);

    const dish = dishes.find(dish => dish._id === id);
    dish.isActive ? dish.isActive = false : dish.isActive = true;
    setIsActive(isActive ? false : true);
  };

  return (
    <>
      {
        isRestorant &&
        <div className={styles.container}>
          <div className={styles.cards}>
            {
              // plates.length ?
              //   plates.map(plate => {

              dishes.length ?
                dishes.map(plate => {
                  console.log(plate.name)
                  return (
                    <CardDish
                      key={plate.id}
                      image={plate.images[0] || "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"}
                      title={plate.name}
                      tags={plate.tags}
                      cost={plate.cost || 0}
                      id={plate._id}
                      isActive={plate.isActive}
                      removeFromMenu={removeFromMenu}
                      editMenu={editMenu}
                    />
                  )
                })
                : <p>No hay platos que mostrar...</p>
            }
          </div>
        </div>
      }
      <Outlet />
    </>
  );
}