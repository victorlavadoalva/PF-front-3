import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Container, Select, MenuItem, InputLabel } from "@mui/material";
import { useDispatch ,useSelector} from "react-redux";
import { PostRestaurant } from "../../Redux/actions";

export default function Form() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const objUser = JSON.parse(window.localStorage.getItem("UserVerificated"));

  const [imagesFile, setImagesFile] = useState([])
  const [restorants, setRestorants] = useState({
    name: objUser.nickname,
    description: "",
    city: "",
    address: "",
    country: "",
    phoneNumber: "",
    images:[],
    type_customer: "Restaurant",
    tags: [],
    capacity: 0,
    email:objUser.email,
  });


  const [errors, setErrors] = useState({
    name: 'Campo Requerido',
    description: '',
    city: "",
    country: "",
    address: "",
    phoneNumber: "",
    capacity: '',
    images: '',
    email: "",
    images:""
  });

  function handleImage(files) {
    const selectFiles = Array.from(files).slice(0, 3);
    
    setImagesFile(selectFiles);
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    if (restorants.name && restorants.city && restorants.country && restorants.address && restorants.description && restorants.capacity) {
      const formData = new FormData();
      formData.append("name", restorants.name);
      formData.append("description", restorants.description);
      formData.append("city", restorants.city);
      formData.append("address", restorants.address);
      formData.append("country", restorants.country);
      formData.append("phoneNumber", restorants.phoneNumber);
      formData.append("type_customer", "Restaurant");
      formData.append("email", restorants.email);
      formData.append("capacity",Number(restorants.capacity) );
      restorants.tags.forEach((tag) => {
        formData.append("tags", tag);
      });
      imagesFile.forEach((file) => {
        formData.append("images", file);
      });
      axios.post("http://localhost:3001/restaurants", formData)
        .then((response) => {
          console.log('Datos enviados:', formData);
          console.log('Respuesta del servidor:',  response.data);
          const{restaurant} = response.data
          console.log(restaurant)
          alert("Usuario creado");
          
          setErrors({});
          setRestorants({
            description: "",
            city: "",
            address: "",
            country: "",
            phoneNumber: "",
            images: null,
            type_customer: "Restaurant",
            tags: [],
            capacity: "",
          });
          localStorage.setItem(
            "UserLogVerificate",
            JSON.stringify(restaurant)
          );
          window.localStorage.setItem("IsLogin", true);
          navigate("/restorant")
        })
        .catch((error) => {
          console.log(error);
          alert("Error al crear el usuario");
        });
      
    } else {
      alert('Información incompleta!');
    }
  };


  const [tagValue, setTagValue] = useState("");
  useEffect(()=>{console.log(restorants.tags)},[restorants])
  function handleTags(event) {
    event.preventDefault();
    if (tagValue!== "") {
      setRestorants({
        ...restorants,
        tags: [...restorants.tags, tagValue]
      });
      setTagValue("")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name !== "tags") {
      setRestorants({
        ...restorants,
        [name]: value
      })
    };


    switch (name) {
      case 'name':
        validateName(value);
        break;
      case 'description':
        validateDescription(value);
        break;
      case 'capacity':
        validateCapacity(value);
        break;
      case 'city':
        validateCity(value);
        break;
      case 'address':
        validateAddress(value);
        break;
      case 'country':
        validateCountry(value);
        break;
      case 'phoneNumber':
        validatePhoneNumber(value);
        break;
      case 'email':
        validateEmail(value);
        break
      default:
        break;
    }

  };

  const validateName = (name) => {
    if (!/^[\p{L}\d\s.,;()']+$/u.test(name) || name.length < 3) {
      setErrors({ ...errors, name: 'Nombre inválido' });
    } else {
      setErrors({ ...errors, name: '' });
    }
  };

  const validateDescription = (description) => {
    if (!/^[\p{L}\d\s.,;()']+$/u.test(description) || description.length < 20) {
      setErrors({ ...errors, description: 'Descripción inválida' });
    } else {
      setErrors({ ...errors, description: '' });
    }
  };

  const validateCapacity = (capacity) => {
    if (!/^[\p{L}\d\s.,;()']+$/u.test(capacity)) {
      setErrors({ ...errors, capacity: 'Se requiere capacidad' });
    } else {
      setErrors({ ...errors, capacity: '' });
    }
  };

  const validateCity = (city) => {
    if (!/^[\p{L}\s.,;()']+$/u.test(city)) {
      setErrors({ ...errors, city: 'Ciudad inválida' });
    } else {
      setErrors({ ...errors, city: '' });
    }
  };

  const validateAddress = (address) => {
    if (!/^[\p{L}\d\s.,;()']+$/u.test(address)) {
      setErrors({ ...errors, address: 'Dirección inválida' });
    } else {
      setErrors({ ...errors, address: '' });
    }
  };

  const validateCountry = (country) => {
    if (!/^[\p{L}\s.,;()']+$/u.test(country)) {
      setErrors({ ...errors, country: 'País inválido' });
    } else {
      setErrors({ ...errors, country: '' });
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!/^[\d\-()\s]+$/.test(phoneNumber)) {
      setErrors({ ...errors, phoneNumber: 'Número de teléfono inválido' });
    } else {
      setErrors({ ...errors, phoneNumber: '' });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;

    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: 'Correo electrónico inválido' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  // const validateImage = (image) => {
  //   if (!/^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG)$/.test(image)) {
  //     setErrors({ ...errors, image: 'Formato inválido' });
  //   } else {
  //     setErrors({ ...errors, image: '' });
  //   }
  // };

  function isFormValid() {
    return (
      errors.name === '' &&
      errors.description === '' &&
      errors.city === '' &&
      errors.country === '' &&
      errors.address === '' &&
      errors.phoneNumber === '' &&
      errors.capacity === '' &&
      errors.images === '' &&
      errors.email === ''
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Box mr={2} mt={2} mb={2}>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Volver</Button>
          </Link>
        </Box>
      </Box>
      <Container className='boxForm' maxWidth="sm">
        <Box display="flex" flexDirection="column" >
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Nombre"
                variant="outlined"
                name="name"
                value={restorants.name}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Name...(al menos 3 caracteres)"
                error={errors.name !== ""}
                helperText={errors.name !== "" ? errors.name : ""}
              />
              <TextField
                label="Ciudad"
                variant="outlined"
                name="city"
                value={restorants.city}
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
                value={restorants.country}
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
                value={restorants.address}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Direccion..."
                error={errors.address !== ""}
                helperText={errors.address !== "" ? errors.address : ""}
              />
              <TextField
                label="Numero de Telefono"
                variant="outlined"
                name="phoneNumber"
                value={restorants.phoneNumber}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Telefono..."
                error={errors.phoneNumber !== ""}
                helperText={errors.phoneNumber !== "" ? errors.phoneNumber : ""}
              />
               <TextField
                label="Correo"
                variant="outlined"
                name="email"
                value={restorants.email}
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
                label="Descripcion"
                variant="outlined"
                name="description"
                value={restorants.description}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Description...(al menos 20 caracteres)"
                multiline
                rows={4}
                error={errors.description !== ""}
                helperText={errors.description !== "" ? errors.description : ""}
              />
              <TextField
                label="Capacidad"
                variant="outlined"
                name="capacity"
                value={restorants.capacity}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Capacidad..."
                error={errors.capacity !== ""}
                helperText={errors.capacity !== "" ? errors.capacity : ""}
              />
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                labelId="tags-label"
                id="tags"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                <MenuItem value="Pizza">Pizza</MenuItem>
                <MenuItem value="Burger">Burger</MenuItem>
                <MenuItem value="Sandwich">Sandwich</MenuItem>
                <MenuItem value="Chicken">Chicken</MenuItem>
                <MenuItem value="Pasta">Pasta</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>

              </Select>
              <Button
                variant="contained"
                onClick={handleTags}
                className={styles.add}
              >
                Agregar
              </Button>
              <input
                type="file"
                name="images"
                multiple
                onChange={(e) => handleImage(e.target.files)}
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