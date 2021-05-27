import * as React from 'react';
import {setState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


export class Controls extends React.Component {
  
	state={
		name:''
	}
	
	render() {
    const { model, selectedNode } = this.props;

    const handleClick = () => {
      //console.log(JSON.stringify(JSON.decycle(model)));
	  const config=JSON.decycle(model);
	  const object={name:this.state.name, config:config};
	  console.log(JSON.stringify(object));
    };

    const handleChange = (event) => {
		console.log(event.target.value);
		this.setState({name:event.target.value});
	  };

    const content = selectedNode ? selectedNode.serialize().temp : "";
    return (
      <div className="controls">
        <pre>{content}</pre>
        <div style={{ display: 'grid', gridGap: '10px', paddingRight: '10px', paddingLeft: '10px'}}>
		<TextField
          id="standard-multiline-flexible"
          label="Name"
          multiline
          rowsMax={4}
          value={this.state.name}
          onChange={handleChange}
        />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Save Configuration
          </Button>
        </div>
      </div>
    );
  }
}
