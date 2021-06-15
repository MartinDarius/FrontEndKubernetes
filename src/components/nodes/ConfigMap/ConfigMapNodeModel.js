import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class ConfigMapNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("configMap");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Depl"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "Secr"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.configMapName = " ";
    this.key = "";
    this.value = "";
    this.secretName = "";
    this.secretKey = "";
    this.nameInDeployment = "";
    this.nameInDepl="";
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.configMapName = object.configMapName;
    this.key = object.key;
    this.value = object.value;
    this.secretName = object.secretName;
    this.secretKey = object.secretKey;
    this.model = object.model;
    this.nameInDeployment= object.nameInDeployment;
    this.nameInDepl=object.nameInDepl;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      configMapName: this.configMapName,
      key: this.key,
      value: this.value,
      secretName: this.secretName,
      secretKey: this.secretKey,
      nameInDeployment: this.nameInDeployment,
      nameInDepl: this.nameInDepl,
    });
  }

  generateYAML() {
    return `
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name:${this.configMapName}
    data: 
      ${this.key}: ${this.value}`;
  }

  getProperties() {
    return {
      configMapName: this.configMapName,
      key: this.key,
      value: this.value,
      nameInDepl: this.nameInDepl
    };
  }

  getAllProperties() {
    return {
      configMapName: this.configMapName,
      configMapKey: this.key,
      value: this.value,
      secretName: this.secretName,
      secretKey: this.secretKey,
      nameInDeployment: this.nameInDeployment,
      nameInDepl: this.nameInDepl
    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    
    let configMapNode = this.model.nodes.filter(
      (item) => item.id === this.id
    )[0];
    configMapNode.configMapName = properties.configMapName;
    configMapNode.key = properties.key;
    configMapNode.value = properties.value;
    configMapNode.nameInDepl= properties.nameInDepl;

    if (
      !(
        Object.keys(this.getOutPort().links).length === 0 &&
        this.getOutPort().links.constructor === Object
      )
    ) {
      let deplId =
        this.getOutPort()
          .getLinks()
          [Object.keys(this.getOutPort().getLinks())[0]].getTargetPort()
          .getParent()
          .getID() === this.id
          ? this.getOutPort()
              .getLinks()
              [Object.keys(this.getOutPort().getLinks())[0]].getSourcePort()
              .getParent()
              .getID()
          : this.getOutPort()
              .getLinks()
              [Object.keys(this.getOutPort().getLinks())[0]].getTargetPort()
              .getParent()
              .getID();

      let deplNode = this.model.nodes.filter((item) => item.id === deplId)[0];
      deplNode.secretName=configMapNode.secretName;
      deplNode.secretKey=configMapNode.secretKey;
      deplNode.configMapName=configMapNode.configMapName;
      deplNode.configMapKey=configMapNode.key;
      deplNode.nameInDeployment= configMapNode.nameInDeployment;
      deplNode.nameInDepl= configMapNode.nameInDepl;
      
    }
    
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
