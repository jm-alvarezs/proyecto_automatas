const INITIAL_STATE = {
  estados: [],
  estado: undefined
};

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
      let idx = states.find(estado => estado.id === estadoActual.id);
      if (idx !== -1) states[idx] = estadoActual;
      return { ...state, estados: states };
    default:
      return { ...state };
  }
};
