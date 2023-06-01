import { useAuth0 } from "@auth0/auth0-react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LoadingApp } from "../../Redux/actions";


export const NavBarMenu = ({anchorEl, setAnchorEl}) => {
    
    const {loginWithRedirect, user, isAuthenticated, logout} = useAuth0()
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    }; 
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        window.localStorage.removeItem("redirectPath");
        window.localStorage.removeItem("UserToken");
        window.localStorage.removeItem("UserLogVerificate");
        window.localStorage.removeItem("isAuthenticated");
        window.localStorage.removeItem("access_token");
        window.localStorage.setItem("IsLogin", false);
        dispatch(LoadingApp(true))
        logout();
      };

    const handleCuentaCliente = () =>{
        navigate('/home/cuentaCliente')
    }

    const handleLogin = () => {
        window.localStorage.setItem("redirectPath", window.location.pathname);
        
        loginWithRedirect();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {isAuthenticated?<>
            <MenuItem onClick={handleMenuClose}>{user.name}</MenuItem>
            <MenuItem onClick={handleCuentaCliente}>Mi cuenta</MenuItem>
            <MenuItem onClick={handleLogOut}>Cerrar sesion</MenuItem>
            </>
            :
            <>
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            </>
            }
      </Menu>
    )
}