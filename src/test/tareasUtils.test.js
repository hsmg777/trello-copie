import {
  diasHasta,
  filtrarPorPrioridad,
  filtrarProximas,
  tareasPintadasRojo
} from '../utils/tareasUtils';

describe('Funcionalidades de filtrado de tareas', () => {
  const hoy = new Date();
  const formatFecha = (offsetDias) => {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + offsetDias);
    return fecha.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const mockTareas = [
    { titulo: 'Alta 1', prioridad: 'Alta', fechaVencimiento: formatFecha(0) }, // hoy
    { titulo: 'Media 1', prioridad: 'Media', fechaVencimiento: formatFecha(1) }, // mañana
    { titulo: 'Baja 1', prioridad: 'Baja', fechaVencimiento: formatFecha(3) }, // no entra
    { titulo: 'Alta 2', prioridad: 'Alta', fechaVencimiento: formatFecha(2) }, // entra
  ];

  test('Filtra por prioridad Alta correctamente', () => {
    const result = filtrarPorPrioridad(mockTareas, 'Alta');
    expect(result.length).toBe(2);
    expect(result.every(t => t.prioridad === 'Alta')).toBe(true);
  });

  test('Filtra tareas próximas a vencer en 2 días', () => {
    const result = filtrarProximas(mockTareas);
    expect(result.length).toBe(3); // incluye días 0, 1, 2
  });

  test('Tareas que vencen hoy o mañana se marcan para pintar en rojo', () => {
    const result = tareasPintadasRojo(mockTareas);
    expect(result.length).toBe(2);
    expect(result.some(t => diasHasta(t.fechaVencimiento) === 0)).toBe(true);
    expect(result.some(t => diasHasta(t.fechaVencimiento) === 1)).toBe(true);
  });
});
