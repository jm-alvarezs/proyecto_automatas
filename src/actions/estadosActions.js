export const setEstadoInicial = id => dispatch => {
  dispatch({ type: "SET_ESTADO_INICIAL", payload: id });
};

export const evaluar = (cadena, simbolos, transiciones) => dispatch => {
  dispatch({ type: "EVALUAR_CADENA", payload: { cadena, simbolos, transiciones } });
  setTimeout(() => dispatch({ type: "CLEAR" }), 3000);
};
