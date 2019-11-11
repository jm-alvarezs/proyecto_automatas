const INITIAL_STATE = {
  transiciones: [],
  transicion: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_TRANSICION":
      let transiciones = [...state.transiciones];
      transiciones.push(action.payload);
      return { ...state, transiciones, transicion: action.payload };
    case "EDIT_TRANSICION":
      return { ...state, transicion: action.payload };
    case "SET_INICIAL_TRANSICION":
      let transicion = { ...state.transicion };
      transicion[action.payload.key] = action.payload.value;
      return { ...state, transicion };
    case "SET_SIMBOLO_TRANSICION":
      let transicion2 = { ...state.transicion };
      transicion2[action.payload.key] = action.payload.value;
      return { ...state, transicion: transicion2 };
    case "SET_FINAL_TRANSICION":
      let transicion3 = { ...state.transicion };
      transicion3[action.payload.key] = action.payload.value;
      return { ...state, transicion: transicion3 };
    case "SAVE_TRANSICION":
      let transitions = [...state.transiciones];
      let transition = { ...state.transicion };
      let idx = transitions.findIndex(
        transicion => transicion.id === transition.id
      );      
      if (idx !== -1) transitions[idx] = transition;
      return { ...state, transiciones: transitions, transicion: undefined };
    case "DELETE_TRANSICION":
      let transiciones2 = [...state.transiciones];
      let i = transiciones2.findIndex(transicion => transicion.id === action.payload);
      if(i !== -1) transiciones2.splice(i, 1);
      return { ...state, transiciones: transiciones2 };
    default:
      return { ...state };
  }
};
