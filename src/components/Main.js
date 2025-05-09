import React, { useState } from 'react';
import { tareas } from '../data/tareas';
import { Link } from 'react-router-dom';

function Main() {
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todas');
  const [verProximas, setVerProximas] = useState(false);

  const handleFiltroChange = (e) => {
    setFiltroPrioridad(e.target.value);
  };

  const toggleVerProximas = () => {
    setVerProximas(!verProximas);
  };

const diasHasta = (fechaStr) => {
  const [dia, mes, anio] = fechaStr.split('/').map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  const hoy = new Date();
  const hoyUTC = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()));
  const diffTime = fecha.getTime() - hoyUTC.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};


  const tareasFiltradas = tareas
    .filter((t) => filtroPrioridad === 'Todas' || t.prioridad === filtroPrioridad)
    .filter((t) => {
      if (!verProximas) return true;
      const dias = diasHasta(t.fechaVencimiento);
      return dias <= 2 && dias >= 0;
    })
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  return (
    <div style={styles.container}>
      <h1>Sistema de Tareas Empresarial</h1>

      <div style={styles.nav}>
        <Link to="/crear" style={styles.link}>➕ Crear Tarea</Link>
        <Link to="/buscar" style={styles.link}>🔍 Buscar Tarea</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Filtrar por prioridad:</label>
        <select value={filtroPrioridad} onChange={handleFiltroChange} style={styles.select}>
          <option value="Todas">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <button onClick={toggleVerProximas} style={styles.buttonToggle}>
        {verProximas ? '🔙 Ver todas' : '⏰ Ver tareas próximas'}
      </button>

      <h2 style={{ marginTop: '20px' }}>Tablero de Tareas</h2>

      <div style={styles.board}>
        {tareas.length === 0 ? (
          <p>No hay tareas en el sistema.</p>
        ) : tareasFiltradas.length === 0 ? (
          <p>No hay tareas {verProximas ? `próximas a vencer` : `con prioridad ${filtroPrioridad}`}</p>
        ) : (
          tareasFiltradas.map((t, index) => {
            const dias = diasHasta(t.fechaVencimiento);
            let estiloTarjeta = { ...styles.card };
            let etiquetaVencimiento = null;

            if (verProximas) {
            const diasVencimiento = diasHasta(t.fechaVencimiento);

            if (diasVencimiento === 0) {
                estiloTarjeta = { ...estiloTarjeta, ...styles.cardRoja };
                etiquetaVencimiento = <p style={styles.etiqueta}><span>🔥 Vence hoy</span></p>;
            } else if (diasVencimiento === 1) {
                estiloTarjeta = { ...estiloTarjeta, ...styles.cardRoja };
                etiquetaVencimiento = <p style={styles.etiqueta}><span>⏰ Vence mañana</span></p>;
            }
            }

            return (
            <div key={index} style={estiloTarjeta}>
                <h3>{t.titulo}</h3>
                <p><strong>ID:</strong> {t.id}</p>
                <p><strong>Descripción:</strong> {t.descripcion}</p>
                <p><strong>Prioridad:</strong> {t.prioridad}</p>
                <p><strong>Vencimiento:</strong> {t.fechaVencimiento}</p>
                {etiquetaVencimiento}
            </div>
            );


          })
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
  select: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  buttonToggle: {
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#ffb347',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
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
  },
  cardRoja: {
    backgroundColor: '#ffcccc',
    border: '2px solid red'
  }
};

export default Main;
