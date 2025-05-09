import React from 'react';
import { tareas } from '../data/tareas';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div style={styles.container}>
      <h1>Sistema de Tareas Empresarial</h1>

      <div style={styles.nav}>
        <Link to="/crear" style={styles.link}>➕ Crear Tarea</Link>
        <Link to="/buscar" style={styles.link}>🔍 Buscar Tarea</Link>
      </div>

      <h2 style={{ marginTop: '20px' }}>Tablero de Tareas</h2>

      <div style={styles.board}>
        {tareas.length === 0 ? (
          <p>No hay tareas todavía.</p>
        ) : (
          tareas.map((t, index) => (
            <div key={index} style={styles.card}>
              <h3>{t.titulo}</h3>
              <p><strong>ID:</strong> {t.id}</p>
              <p><strong>Descripción:</strong> {t.descripcion}</p>
              <p><strong>Prioridad:</strong> {t.prioridad}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#f4f5f7',
    minHeight: '100vh'
  },
  nav: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#0079bf',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px'
  },
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'white',
    width: '250px',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'left'
  }
};

export default Main;
