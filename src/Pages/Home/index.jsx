import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { SimpleCard } from '../../Components/Card/index';
import PaginationRounded from "../../Components/Paginado";
import SelectSmall from '../../Components/Select';
import { getRestorants } from "../../Redux/actions";
import { LOCATION, ORDER, RATING, TAGS } from '../../dataHardcodeo/constants'; // Cuando tengamos la info del backend esto hay que sacarlo
import styles from "./styles.module.css";
import React from 'react';
import { Typography, List, ListItem, Button } from '@mui/material';


export default function Home() {
  const locationRouter = useLocation()
  const { restorants } = useSelector(state => state);
  const dispatch = useDispatch();

  const currentPath = locationRouter.pathname;
  const shouldRenderPagination = !currentPath.includes('/menuCliente');


  const [city, setCity] = useState('');
  const [order, setOrder] = useState('');
  const [rating, setRating] = useState('');
  const [searchName] = useState("")
  const [tag, setTag] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);


  useEffect(() => {
    if (order || rating || city || tag) {
      let stringTag = tag.length > 0 ? tag.join('~') : tag
      console.log("stringTag",stringTag)
      dispatch(getRestorants({ order, rating, searchName, city, stringTag }));
    }
  }, [dispatch, order, rating, city, tag, searchName]);

  useEffect(() => {
    if (!restorants.documents) dispatch(getRestorants({}));
  }, [dispatch, restorants.documents, restorants.length]);

  const handleChangeLocation = (loc) => {
    if (city === loc) {
      setCity('');
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => !filter.startsWith('Ubicación')));
    } else {
      setCity(loc);
      setSelectedFilters((prevFilters) => {
        const updatedFilters = prevFilters.filter((filter) => !filter.startsWith('Ubicación'));
        return [...updatedFilters, `Ubicación: ${loc}`];
      });
    }
  };

  const handleChangeOrder = (ord) => {
    if (order === ord) {
      setOrder('');
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => !filter.startsWith('Alfabet')));
    } else {
      setOrder(ord);
      setSelectedFilters((prevFilters) => {
        const updatedFilters = prevFilters.filter((filter) => !filter.startsWith('Alfabet'));
        return [...updatedFilters, `Alfabet: ${ord}`];
      });
    }
  };

  const handleChangeTags = (tg) => {
    if (tag.includes(tg)) {
      setTag((prevTags) => prevTags.filter((tag) => tag !== tg));
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => !filter.startsWith('Tag')));
    } else {
      setTag((prevTags) => [...prevTags, tg]);
      setSelectedFilters((prevFilters) => {
        const updatedFilters = prevFilters.filter((filter) => !filter.startsWith('Tag'));
        return [...updatedFilters, `Tag: ${tg}`];
      });
    }
  };

  const handleChangeRating = (rtg) => {
    if (rating === rtg) {
      setRating('')
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => !filter.startsWith('Valoracion')));
    } else {
      setOrder(rtg);
      setSelectedFilters((prevFilters) => {
        const updatedFilters = prevFilters.filter((filter) => !filter.startsWith('Valoracion'));
        return [...updatedFilters, `Valoracion: ${rtg}`];
      });
    }
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
  
    if (filter.startsWith('Ubicación')) {
      setCity('');
    } else if (filter.startsWith('Alfabet')) {
      setOrder('');
    } else if (filter.startsWith('Tags')) {
      setTag((prevTags) => prevTags.filter((tag) => `Tag: ${tag}` !== filter));
    } else if (filter.startsWith('Valoracion')) {
      setRating('');
    }
  };
  
  console.log('Filters:', { city, rating, order, tag });

  return (
    <>
      {
        (locationRouter.pathname === "/home" ) &&
        <div>
          <div className={styles.paginate}>
            <div className={styles.paginationContainer}> {/* Nuevo contenedor */}
              <PaginationRounded filters={{ city, rating, order, tag }} />
            </div>
          </div>
        <div className={styles.homeContainer}>
          {/* La info se obtiene de la carpeta dataHardcodeo hasta que se reciba la info del back */}
          {/* Hay que conectar los filtros con el backend - No están conectados */}
          <div className={styles.filtersContainer}>
            <Typography variant="h6">Filtros seleccionados</Typography>
            <List>
              {selectedFilters.map((filter) => (
                <ListItem key={filter} >
                  {filter} <Button onClick={() => handleRemoveFilter(filter)}>x</Button>
                </ListItem>
              ))}
            </List>
      
            <Typography variant="h6">Ubicación</Typography>
            <List>
              {LOCATION.map((option) => (
                <ListItem key={option.id} button onClick={() => handleChangeLocation(option.id)}>
                  <Typography>{option.name}</Typography>
                </ListItem>
              ))}
            </List>
      
            <Typography variant="h6">Ordenar alfabeticamente</Typography>
            <List>
              {ORDER.map((option) => (
                <ListItem key={option.id} button onClick={() => handleChangeOrder(option.id)}>
                  <Typography>{option.name}</Typography>
                </ListItem>
              ))}
            </List>
      
            <Typography variant="h6">Categoria</Typography>
            <List>
              {TAGS.map((option) => (
                <ListItem key={option.id} button onClick={() => handleChangeTags(option.id)}>
                  <Typography>{option.name}</Typography>
                </ListItem>
              ))}
            </List>
      
            <Typography variant="h6">Ordenar por valoracion</Typography>
            <List>
              {RATING.map((option) => (
                <ListItem key={option.id} button onClick={() => handleChangeRating(option.id)}>
                  <Typography>{option.name}</Typography>
                </ListItem>
              ))}
            </List>
          </div>
          {/* Conectar el páginado tbm */}
          <div className={styles.cardsContainer}>
            {
              restorants?.documents?.length ?
                restorants?.documents?.map(resto => {
                  return (
                    <SimpleCard
                      key={resto._id}
                      image={resto.images[0] || "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"}
                      title={resto.name}
                      city={resto.city || "Ciudad"}
                      address={resto.adress || "Direccion"}
                      id={resto._id}
                    />
                  )
                })
                : <p>Loading...</p>
            }
          </div>
        </div>
        </div>
      }
      <Outlet />
    </>
  );
};

