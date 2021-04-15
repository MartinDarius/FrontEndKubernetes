const getInitialState = () => ({
  selectedNode: null,
  model: null
});

export const reducerFn = (state, action) => {
  state = state || getInitialState()
  switch (action.type) {
    case 'node-selected':
      return {
        ...state,
        selectedNode: action.node
      };
    case 'update-model':
      return {
        ...state,
        model: action.model,
        ...action.props
      };
    default:
      return state;
  }
};

export const reducer = reducerFn;