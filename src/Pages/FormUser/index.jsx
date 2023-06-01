import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Box, Button, Container } from "@mui/material";

export default function FormUser() {
  const objUser = JSON.parse(window.localStorage.getItem("UserVerificated"));
  const redirect = window.localStorage.getItem("redirectPath")
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: objUser.nickname,
    email: objUser.email,
    city: "",
    address: "",
    country: "",
    phone:"",
    images:[objUser.picture],
    type_customer: "User",
    description:null,
  });

  const [errors, setErrors] = useState({
    name: "Campo requerido",
    email: "",
    city: "Campo requerido",
    address: "Campo requerido",
    country: "Campo requerido",
    phone:"",
    type_customer: "User",
    description:null,
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (user.city && user.country && user.address && user.name && user.phone) {
      const formData = new FormData();      
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("city", user.city);
      formData.append("address", user.address);
      formData.append("country", user.country);
      formData.append("phone", user.phone);
      formData.append("images", user.images);
      formData.append("type_customer", user.type_customer);
      axios
        .post(
          "http://localhost:3001/users",
          formData
        )
        .then((response) => {
          console.log("Datos enviados:", formData);
          console.log("Respuesta del servidor:", response.data);
          alert("Usuario creado");
          setErrors({});
          setUser({
            city: "",
            country: "",
            address: "",
            type_customer: "User",
          });
          localStorage.setItem(
            "UserLogVerificate",
            JSON.stringify(response.data)
          );
          window.localStorage.setItem("IsLogin", true);
          navigate(redirect)
        })
        .catch((error) => {
          console.log(error);
          alert("Error al crear el usuario");
        });
    } else {
      alert("Información incompleta!");
    }
    console.log(user);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name !== "tags") {
      setUser({
        ...user,
        [name]: value,
      });
    }
    console.log(user);

    switch (name) {
      case "city":
        validateCity(value);
        break;
      case "address":
        validateAddress(value);
        break;
      case "country":
        validateCountry(value);
        break;
      case "phone":
        validatePhoneNumber(value);
        break;
      case "name":
        validateName(value)
      default:
        break;
    }
  }

  const validateName = (name) => {
    if (!/^[\p{L}\d\s.,;()']+$/u.test(name) || name.length < 3) {
      setErrors({ ...errors, name: 'Nombre inválido' });
    } else {
      setErrors({ ...errors, name: '' });
    }
  };

  const validatePhoneNumber = (phone) => {
    if (!/^[0-9]+$/.test(phone)) {
      setErrors({ ...errors, phone: "Número de teléfono inválido" });
    } else {
      setErrors({ ...errors, phone: "" });
    }
  };

  const validateCity = (city) => {
    if (!/^[\p{L}\s.,;()']+$/u.test(city)) {
      setErrors({ ...errors, city: "Ciudad inválida" });
    } else {
      setErrors({ ...errors, city: "" });
    }
  };

  const validateAddress = (address) => {
    if (!/^[\p{L}\d\s.,;()']+$/u.test(address)) {
      setErrors({ ...errors, address: "Dirección inválida" });
    } else {
      setErrors({ ...errors, address: "" });
    }
  };

  const validateCountry = (country) => {
    if (!/^[\p{L}\s.,;()']+$/u.test(country)) {
      setErrors({ ...errors, country: "País inválido" });
    } else {
      setErrors({ ...errors, country: "" });
    }
  };

  function isFormValid() {
    return errors.city === "" && errors.country === "" && errors.address === "";
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Box mr={2} mt={2} mb={2}>
          <Link to="/user-type" style={{ textDecoration: "none" }}>
            <Button variant="contained">Volver</Button>
          </Link>
        </Box>
      </Box>
      <Container className="boxForm" maxWidth="sm">
        <Box display="flex" flexDirection="column">
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Nombre"
                variant="outlined"
                name="name"
                value={user.name}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Nombre..."
                // error={errors.city !== ""}
                // helperText={errors.city !== "" ? errors.city : ""}
              />
              <TextField
                label="Correo"
                variant="outlined"
                name="email"
                value={user.email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Correo..."
                disabled={true} 
                nputProps={{
                  readOnly: true,
                }}
                // error={errors.city !== ""}
                // helperText={errors.city !== "" ? errors.city : ""}
              />
              <TextField
                label="Telefono"
                variant="outlined"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Telefono..."
                error={errors.phone !== ""}
                helperText={errors.phone !== "" ? errors.phone : ""}
              />
              <TextField
                label="Ciudad"
                variant="outlined"
                name="city"
                value={user.city}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Ciudad..."
                error={errors.city !== ""}
                helperText={errors.city !== "" ? errors.city : ""}
              />
              <TextField
                label="Pais"
                variant="outlined"
                name="country"
                value={user.country}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Pais..."
                error={errors.country !== ""}
                helperText={errors.country !== "" ? errors.country : ""}
              />
              <TextField
                label="Direccion"
                variant="outlined"
                name="address"
                value={user.address}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Direccion..."
                error={errors.address !== ""}
                helperText={errors.address !== "" ? errors.address : ""}
              />
              <Box mr={2} mt={2} mb={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid()}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
