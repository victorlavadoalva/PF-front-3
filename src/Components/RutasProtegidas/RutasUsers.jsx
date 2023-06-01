import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, Navigate ,useLocation} from "react-router-dom";
import { GetUserEmail, LoadingApp, GetTokenLogin,Register } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function RutasUsers() {
  
  const { userFoundByEmail, tokenLogin, error } = useSelector((state) => state);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const redirection = "/user-type";
  const restaurantRoute = "/restorant";
  const dataUser = window.localStorage.getItem("UserLogVerificate");
  const restaurant = JSON.parse(dataUser);
  let userRol = ""
  if(restaurant === null){
    userRol = ""
  }else{
    userRol = restaurant.type_customer
  }
  const [saveEmail, setSaveEmail] = useState("");
  const [saveName, setSaveName] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [TokenSave, setTokenSave] = useState(false)
  console.log("Verificado", isAuthenticated);
  console.log("isLoading", isLoading);


// useEffect(() => {
// if(error.length){
//   alert(error[1])
// }
// },[error])

  useEffect(() => {
    if (isAuthenticated) {
      if(user.email){
        setSaveEmail(user.email);
        const objUser = JSON.stringify(user);
        window.localStorage.setItem("isAuthenticated", objUser);
        

      }else{
        setSaveName(user.name)
        const objUser = JSON.stringify(user)
        window.localStorage.setItem("isAuthenticated", objUser);
        
      }
    }else{
          window.localStorage.setItem("IsLogin", JSON.stringify(false));
    }
  }, [isAuthenticated, user]);
console.log(saveEmail)
  useEffect(() => {
    if (saveEmail) {
      dispatch(GetUserEmail({ saveEmail }));
    }
  }, [dispatch, saveEmail, saveName]);

  useEffect(() => {
    const checkIfNewUser = async () => {
      const isLoginString = window.localStorage.getItem("IsLogin");
      const isLogin = JSON.parse(isLoginString);
      if (!isLogin) {
        if (userFoundByEmail[0] === true && userFoundByEmail[1].type_customer === "User") {
          dispatch(GetTokenLogin("Cliente", userFoundByEmail[1].email));
          const storedPath = localStorage.getItem("redirectPath");
          navigate(storedPath);
          window.localStorage.removeItem("redirectPath");
          dispatch(LoadingApp(false));
        } else if (
          userFoundByEmail[0] === true &&
          userFoundByEmail[1].type_customer === "Restaurant"
        ) {
          console.log("!!!!!!!!!!!!Restaurant",userFoundByEmail[1].email)
          dispatch(GetTokenLogin("Restaurant", userFoundByEmail[1].email));

          // navigate(restaurantRoute);
          window.localStorage.removeItem("redirectPath");
          dispatch(LoadingApp(false));
        } else if (userFoundByEmail[0] === false && location.pathname !== "/user-type/form-user" && location.pathname !== "/user-type/form-restaurant") {
          console.log("!!!!!!!!!!No esta registrado")
          dispatch(Register(user))
          navigate(redirection);
          dispatch(LoadingApp(false));
        }
      }
    };
    checkIfNewUser();
  }, [dispatch, userFoundByEmail, navigate]);

  useEffect(() => {
    console.log(tokenLogin)
    if (tokenLogin[0] === true) {
      const objUser = JSON.stringify(tokenLogin[1]);
      window.localStorage.setItem("UserLogVerificate", objUser);
      window.localStorage.setItem("IsLogin", true);  
        if(tokenLogin[1].type_customer === "Restaurant") {
          setShouldRedirect(true);
        } 
    }
  }, [tokenLogin])
console.log("DATA SUBIDA", restaurant)
  useEffect(() => {
    if (userRol === "Restaurant") {
      setShouldRedirect(true);
    }
  }, []);

  if (shouldRedirect) {
    navigate(restaurantRoute);
    return null; // Evitar que se muestre la ruta antes de redirigir
  }else{
    return <Outlet />;
  }

  
}
