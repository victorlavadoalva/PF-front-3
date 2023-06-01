import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,useLocation, Outlet} from "react-router";
import styles from "./styles.module.css"


export default function UserType() {
  const navigate = useNavigate()
  // const dispatch = useDispatch();
  const location = useLocation()
  const {user_register} = useSelector((state) => state)

const handleTypeClient = (event) => {
  event.preventDefault()
  window.localStorage.setItem("UserVerificated", JSON.stringify(user_register))
  navigate("/user-type/form-user")
}
const handleTypeRestaurant= (event) => {
  event.preventDefault()
  window.localStorage.setItem("UserVerificated", JSON.stringify(user_register))
  navigate("/user-type/form-restaurant")
}


  return (
    <>
    <div className={styles.container}>

    {location.pathname === "/user-type" &&

                <ul>
                    <li>
                        <button onClick={handleTypeClient} >Cliente</button>
                    </li>
                    <li>
                        <button onClick={handleTypeRestaurant} >Restaurante</button>
                    </li>
                </ul>
    }
    <Outlet/>
    </div>
    
    </>
  );
}