const INITIAL_STATE = {
  simbolos: [],
  simbolo: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_SIMBOLO":
      let simbolos = [...state.simbolos];
      let index = simbolos.findIndex(simbolo => simbolo.simbolo === action.payload.simbolo);
      if (index !== -1) return { ...state };
      simbolos.push(action.payload);  
      return { ...state, simbolos, simbolo: action.payload };
    case "EDIT_SIMBOLO":
      return { ...state, simbolo: action.payload };
    case "SET_SIMBOLO_SIMBOLO":
        let simbolo = {...state.simbolo};
        simbolo[action.payload.key] = action.payload.value;
        return { ...state, simbolo };
    case "SAVE_SIMBOLO":
        let symbols = [...state.simbolos];
        let symbol = {...state.simbolo};
        let idx = symbols.find(simbolo => simbolo.id === symbol.id);
        if(idx !== -1) symbols[idx] = symbol;
        return { ...state, simbolos: symbols };
    default:
      return { ...state };
  }
};
