export const editRow = (element, reducer) => dispatch => {
    dispatch({ type: `EDIT_${reducer}`, payload: element });
};

export const saveRow = (element, reducer) => dispatch => {
    dispatch({ type: `SAVE_${reducer}`, payload: element });    
};

export const setPropertyRow = (key, reducer, value) => dispatch => {    
    dispatch({ type: `SET_${key.toUpperCase()}_${reducer}`, payload: { key, value }});
};

export const createRow = (reducer, schema) => dispatch => {
    dispatch({ type: `CREATE_${reducer}`, payload: schema });
};