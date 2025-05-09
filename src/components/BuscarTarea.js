import React, { useState } from 'react';
import { buscarTareaPorId } from '../data/tareas';

function BuscarTarea() {
  const [id, setId] = useState('');
  const [tareaEncontrada, setTareaEncontrada] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleBuscar = () => {
    const tarea = buscarTareaPorId(id);

    if (!tarea) {
      setTareaEncontrada(null);
      setMensaje('❌ No se encontró ninguna tarea con ese ID.');
    } else {
      setTareaEncontrada(tarea);
      setMensaje('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Buscar Tarea por ID</h2>
      <input
        style={styles.input}
        placeholder="Ingrese el ID de la tarea"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button style={styles.button} onClick={handleBuscar}>Buscar</button>
      {mensaje && <p>{mensaje}</p>}

      {tareaEncontrada && (
        <div style={styles.card}>
          <h3>{tareaEncontrada.titulo}</h3>
          <p><strong>Descripción:</strong> {tareaEncontrada.descripcion}</p>
          <p><strong>Prioridad:</strong> {tareaEncontrada.prioridad}</p>
          <p><strong>Vencimiento:</strong> {tareaEncontrada.fechaVencimiento}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    width: '300px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    backgroundColor: '#5aac44',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  card: {
    marginTop: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    width: '300px',
    margin: '20px auto',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    textAlign: 'left'
  }
};

export default BuscarTarea;
