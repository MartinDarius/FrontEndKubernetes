import * as actionTypes from './actionTypes';

export const onNodeSelected = (node) => {
    return {
        type: actionTypes.NODE_SELECTED,
        node: node
    };
};

export const updateModel = (model, props={}) => {
    return {
        type: actionTypes.UPDATE_MODEL,
        model: model,
        props: props
    };
};

