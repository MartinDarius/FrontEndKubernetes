import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContextProvider as DndContext} from 'react-dnd';
import { connect } from 'react-redux';
import * as actions from './components/store/actions/index';
import { NodesPanel } from './components/DiagramComponents/NodesPanel';
import Diagram from './components/DiagramComponents/Diagram';
import { Controls } from './components/DiagramComponents/Controls';
import './diagram.css';
import './base.css';
import './App.css';
import {deleteCookie} from './cookieHandler';

export const globalConst = {};


class DiagramBuilder extends React.Component {
	onLogout = () => {
			deleteCookie('userSession');
			document.location.reload();
		}

  render(){	 
  	const { model, selectedNode, onNodeSelected, updateModel } = this.props;
	  globalConst.updateModel = updateModel;
	  console.log("model", model)
  	return (
    	<DndContext backend={HTML5Backend}>
    		<div className='parent-container'>
    	    	<NodesPanel />
  	     	<Diagram
  	        	model={model}
  	        	updateModel={updateModel}
  	        	onNodeSelected={onNodeSelected}
  	       	/>
  	      	<Controls
  	        	selectedNode={selectedNode}
  	       />
			</div>

  	    </DndContext>
  );
  }
}



const mapStateToProps = state => ({
	selectedNode: state.selectedNode,
	model: state.model
  });
  
const mapDispatchToProps = dispatch => {
    globalConst.dispatch = dispatch;
	return {
		onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
		updateModel: (model, props) => dispatch(actions.updateModel(model, props))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(DiagramBuilder);
