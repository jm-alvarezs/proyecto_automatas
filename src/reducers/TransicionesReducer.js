const INITIAL_STATE = {
  transiciones: [],
  transicion: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_TRANSICION":
      let transiciones = [...state.transiciones];
      transiciones.push(action.payload);
      return { ...state, transiciones };
    case "EDIT_TRANSICION":
      return { ...state, transicion: action.payload };
    case "SET_PROPIEDAD_TRANSICION":
      let transicion = { ...state.transicion };
      transicion[action.payload.key] = action.payload.value;
      return { ...state, transicion };
    case "SAVE_TRANSICION":
      let transitions = [...state.transiciones];
      let transition = { ...state.transicion };
      let idx = transitions.find(transicion => transicion.inicial === transition.inicial);
      if (idx !== -1) transitions[idx] = transition;
      return { ...state, transiciones: transitions };
    default:
      return { ...state };
  }
};
