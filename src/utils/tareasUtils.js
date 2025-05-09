export const diasHasta = (fechaStr) => {
  const [dia, mes, anio] = fechaStr.split('/').map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  const hoy = new Date();
  const hoyUTC = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()));
  const diffTime = fecha.getTime() - hoyUTC.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const filtrarPorPrioridad = (tareas, prioridad) => {
  return prioridad === 'Todas'
    ? tareas
    : tareas.filter((t) => t.prioridad === prioridad);
};

export const filtrarProximas = (tareas) => {
  return tareas.filter((t) => {
    const dias = diasHasta(t.fechaVencimiento);
    return dias >= 0 && dias <= 2;
  });
};

export const tareasPintadasRojo = (tareas) => {
  return tareas.filter((t) => {
    const dias = diasHasta(t.fechaVencimiento);
    return dias >= 0 && dias <= 1;
  });
};
