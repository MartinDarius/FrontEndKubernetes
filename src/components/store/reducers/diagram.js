import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedNode: null,
    model: null
};

const onNodeSelected = (state, action) => {
    return {
        ...state,
        selectedNode: action.node
      };
}

const updateModel = (state, action) => {
    return {
        ...state,
        model: action.model,
        ...action.props
      };
}


const reducer = ( state =initialState, action) => {
    switch(action.type){
        case actionTypes.NODE_SELECTED: return onNodeSelected(state,action);
        case actionTypes.UPDATE_MODEL: return updateModel(state,action);
        default: return state; 
    }
}

export default reducer;