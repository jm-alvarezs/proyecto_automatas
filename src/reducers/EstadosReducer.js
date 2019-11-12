const INITIAL_STATE = {
  estados: [],
  estado: undefined,
  inicial: undefined,  
  aceptado: undefined
};

const evaluar = (cadena, simbolos, transiciones, estados, inicial) => {
  let estado = inicial;
  for (let i = 0; i < cadena.length; i++) {
    let simbolo = cadena[i];
    let esValido = simbolos.find(symbol => symbol.simbolo === simbolo);
    if(!esValido) return { aceptado: false, message: `El símbolo "${simbolo}" de la cadena no se encuentra en el lenguaje` };
    let transicion = transiciones.find(
      transicion =>
        transicion.inicial === estado && transicion.simbolo === cadena[i]
    );
    if (transicion) estado = transicion.final;
    else estado = undefined;
  }
  let completo = estados.find(state => state.id === estado.id);
  if(completo === undefined) return { aceptado: false, message: "No hay transición de estado para algún símbolo. "};
  return completo.final === 1;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_ESTADO":
      let estados = [...state.estados];
      let index = estados.findIndex(
        estado => estado.nombre === action.payload.nombre
      );
      if (index !== -1) return { ...state };
      estados.push(action.payload);
      return { ...state, estados, estado: action.payload };
    case "EDIT_ESTADO":
      return { ...state, estado: action.payload };
    case "SET_NOMBRE_ESTADO":
      let estado = { ...state.estado };
      estado[action.payload.key] = action.payload.value;
      return { ...state, estado };
    case "SAVE_ESTADO":
      let states = [...state.estados];
      let estadoActual = { ...state.estado };
      let idx = states.findIndex(estado => estado.id === estadoActual.id);      
      if (idx !== -1) states[idx] = estadoActual;
      let inicial = state.inicial;
      if(states.length === 1 && inicial === undefined) inicial = states[0].id; 
      return { ...state, estados: states, estado: undefined, inicial };
    case "DELETE_ESTADO":
      let status = [...state.estados];
      let i = status.findIndex(estado => estado.id === action.payload);
      if(i !== -1) status.splice(i, 1);
      return { ...state, estados: status };
    case "SET_ESTADO_INICIAL":
      return { ...state, inicial: action.payload };
    case "EVALUAR_CADENA":
      const { cadena, simbolos, transiciones } = action.payload;
      let aceptado = evaluar(cadena, simbolos, transiciones, state.estados, state.inicial);
      if(typeof aceptado === "object")
        return {...state, ...aceptado };
      return { ...state, aceptado };
    case "CLEAR":
      return { ...state, aceptado: undefined, message: undefined };
    default:
      return { ...state };
  }
};
