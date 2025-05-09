import React, { useState } from 'react';
import { agregarTarea } from '../data/tareas';
import { useNavigate } from 'react-router-dom';

function CrearTarea() {
  const [tarea, setTarea] = useState({ titulo: '', descripcion: '', prioridad: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const { titulo, descripcion, prioridad } = tarea;

    if (!titulo || !descripcion || !prioridad) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    agregarTarea(tarea);
    setMensaje('✅ Tarea creada con éxito.');
    setTarea({ titulo: '', descripcion: '', prioridad: '' });

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h2>Crear Tarea</h2>
      <form style={styles.card} onSubmit={handleSubmit}>
        {/* Ya no se pide el ID */}
        <input
          style={styles.input}
          name="titulo"
          placeholder="Título"
          value={tarea.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          style={styles.textarea}
          name="descripcion"
          placeholder="Descripción"
          value={tarea.descripcion}
          onChange={handleChange}
          required
        />
        <select
          style={styles.select}
          name="prioridad"
          value={tarea.prioridad}
          onChange={handleChange}
          required
        >
          <option value="">Prioridad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <button type="submit" style={styles.button}>Agregar Tarea</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  card: {
    width: '300px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    height: '60px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  select: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    backgroundColor: '#0079bf',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default CrearTarea;
