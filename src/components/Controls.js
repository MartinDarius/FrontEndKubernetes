import React from 'react';


export class Controls extends React.Component {
  render() {
    const { selectedNode } = this.props;

   const content = selectedNode ? selectedNode.serialize().temp : '';
  	return (
  	  <div className='controls'>  
  	    <pre>
	      {content}
  	    </pre>
    	</div>
  	);
  }
}
