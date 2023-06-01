import React from 'react';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from "./styles.module.css";

export default function Developers() {
  const handleLinkedInClick = (linkedin) => {
    window.open(linkedin, '_blank');
  };

  const backendTeam = [
    {
      name: 'Santiago Leyria',
      photo: '/path/to/photo1.jpg',
      linkedin: 'https://www.linkedin.com/in/santiago-leyria-lino-182497219',
    },
    {
      name: 'Victor Lavado',
      photo: '/path/to/photo2.jpg',
      linkedin: 'https://www.linkedin.com/in/victor-lavado/',
    },
    {
      name: 'Miguel Sierra',
      photo: '/path/to/photo3.jpg',
      linkedin: 'https://www.linkedin.com/in/miguel-sierra-bola%C3%B1os-a995b5263',
    },
    {
      name: 'Integrante 4',
      photo: '/path/to/photo4.jpg',
      linkedin: 'https://www.linkedin.com/profile3',
    },

  ];

  const frontendTeam = [
    {
      name: 'Gonzalo Medina',
      photo: '/path/to/photo5.jpg',
      linkedin: 'https://www.linkedin.com/in/gonzalo-medina-borsotto-7565b9263/',
    },
    {
      name: 'Gonzalo Suarez',
      photo: '/path/to/photo6.jpg',
      linkedin: 'https://www.linkedin.com/in/gonzalo-suarez-7bab9a206/',
    },
    {
      name: 'Aldana Alonso',
      photo: '/path/to/photo7.jpg',
      linkedin: 'https://www.linkedin.com/in/aldana-soledad-alonso/',
    },
    {
      name: 'Franco Krismann',
      photo: '/path/to/photo8.jpg',
      linkedin: 'https://www.linkedin.com/in/franco-gabriel-krismann-',
    },
  ];

  return (
    <div className={styles.container}>
      
      <div className={styles.column}>
        <div className={styles.title}>
        <Typography variant="h3" component="h3">
          Equipo Backend
        </Typography>
        </div>
        <div className={styles.team}>
        {backendTeam.map((member) => (
          <div className={styles.integrante}>
            <img src={member.photo} alt={member.name} />
            <Typography variant="h4" component="h4">
              {member.name}
            </Typography>
            <a href="#" onClick={() => handleLinkedInClick(member.linkedin)}>
              <LinkedInIcon />
            </a>
          </div>
        ))}
        </div>
      </div>
      
      <div className={styles.column}>
      <div className={styles.title}>
        <Typography variant="h3" component="h3">
          Equipo Frontend
        </Typography>
      </div>
        <div className={styles.team}>
        {frontendTeam.map((member) => (
          <div className={styles.integrante}>
            <img src={member.photo} alt={member.name} />
            <Typography variant="h4" component="h4">
              {member.name}
            </Typography>
            <a href="#" onClick={() => handleLinkedInClick(member.linkedin)}>
              <LinkedInIcon />
            </a>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
