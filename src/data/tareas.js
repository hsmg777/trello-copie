export let tareas = [];
let idActual = 1; 

export function agregarTarea(tarea) {
  tarea.id = idActual++;
  tareas.push(tarea);
}

export function buscarTareaPorId(id) {
  return tareas.find(t => String(t.id) === String(id));
}
