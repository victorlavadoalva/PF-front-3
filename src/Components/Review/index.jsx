import React, { useState } from 'react';
import { Rating, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';


const Review = ({ restoId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [number, setNumber] = useState(1);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoidHJ1ZSIsImlhdCI6MTY4NTYxNzY3NywiZXhwIjo0ODQxMzc3Njc3fQ.Km8OWeI_l6zQOuSN8jE3GGN-Yuju2NEzTUN2tWVgIgw";

  console.log('restoId:', restoId);
  console.log('token:',token)
  console.log(process.env)


  const handleValChange = (event, value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const valoraciones = {
        rating: rating,
        comment: comment,
        number: number,
      };
      console.log('valoracion:',valoraciones)

      const response = await axios.put(
        `http://localhost:3001/restaurants/${restoId}`,
        {
          valoraciones,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoidHJ1ZSIsImlhdCI6MTY4NTYxNzY3NywiZXhwIjo0ODQxMzc3Njc3fQ.Km8OWeI_l6zQOuSN8jE3GGN-Yuju2NEzTUN2tWVgIgw`,
          },
        }
      );
      
      console.log('response:',response); 
      setRating(0);
      setComment('');
      setNumber((prevNumber) => prevNumber + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h6">Deja tu valoración:</Typography>
        <Rating name="rating" value={rating} onChange={handleValChange} />
      </div>
      <div>
        <TextField
            label="Comentario"
            value={comment}
            onChange={handleCommentChange}
            multiline
            rows={4}
        />
        <br/>
        <div style={{ marginTop: '8px' }}>
            <Button variant="contained" onClick={handleSubmit}>
                Enviar
            </Button>
        </div>
      </div>
    </div>
    
  );
};

export default Review;
