import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function RutaRestaurant() {
  
  const navigate = useNavigate()
  const redirection = "/home"
  const [shouldRedirect, setShouldRedirect] = useState(false);
  let Admin = null;

  useEffect(() => {
    const dataUser = window.localStorage.getItem("UserLogVerificate");
    if (dataUser) {
      const restaurant = JSON.parse(dataUser);
      Admin = restaurant.isAdmin;
      if (Admin !== true) {
        setShouldRedirect(true);
      }
    } else {
      setShouldRedirect(true);
    }
    
  }, []);


  if (shouldRedirect) {
    navigate(redirection);
    return null; // Evitar que se muestre la ruta antes de redirigir
  } else {
    return <Outlet />;
  }

}




