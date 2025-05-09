import { tareas, agregarTarea } from '../data/tareas';

beforeEach(() => {
  tareas.length = 0;
  
  jest.resetModules();
});

test('Los IDs deben ser únicos e incrementales', () => {
  agregarTarea({ titulo: 'Tarea 1', descripcion: 'Desc 1', prioridad: 'Alta' });
  agregarTarea({ titulo: 'Tarea 2', descripcion: 'Desc 2', prioridad: 'Media' });

  expect(tareas.length).toBe(2);
  expect(tareas[0].id).toBe(1);
  expect(tareas[1].id).toBe(2);
});

test('La prioridad debe ser Alta, Media o Baja solamente', () => {
  const tarea = { titulo: 'Prueba', descripcion: 'Tarea prueba', prioridad: 'Media' };
  agregarTarea(tarea);
  
  const prioridadValida = ['Alta', 'Media', 'Baja'];
  expect(prioridadValida.includes(tareas[0].prioridad)).toBe(true);
});

test('Se deben poder crear tareas y agregarse correctamente', () => {
  agregarTarea({ titulo: 'Nueva', descripcion: 'Desc', prioridad: 'Alta' });
  expect(tareas.length).toBe(1);
  expect(tareas[0].titulo).toBe('Nueva');
});
