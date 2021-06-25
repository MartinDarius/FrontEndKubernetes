import _ from "lodash";
import * as RJD from "react-js-diagrams";
import { store } from "../../store/store";
import { updateModel } from "../../store/actions/diagram";

export class SecretNodeModel extends RJD.NodeModel {
  constructor(name = "Untitled", color = "rgb(224, 98, 20)") {
    super("secret");
    this.addPort(new RJD.DefaultPortModel(false, "output", "Out"));
    this.addPort(new RJD.DefaultPortModel(true, "input", "In"));
    this.name = name;
    this.color = color;
    this.model = {};
    this.secretName = " ";
    this.key = "";
    this.value = "";
    this.types= "";
    this.nameInDeployment="";
    this.key2="";
    this.value2="";
    this.nameInDeployment2="";

  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.secretName = object.secretName;
    this.key = object.key;
    this.value = object.value;
    this.model = object.model;
    this.types= object.types;
    this.nameInDeployment= object.nameInDeployment;
    this.key2 = object.key2;
    this.value2 = object.value2;
    this.nameInDeployment2= object.nameInDeployment2;

  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      temp: this.generateYAML(),
      secretName: this.secretName,
      key: this.key,
      value: this.value,
      model: this.model,
      types: this.types,
      nameInDeployment: this.nameInDeployment,
      key2: this.key2,
      value2: this.value2,
      nameInDeployment2: this.nameInDeployment2,

    });
  }

  generateYAML() {
    let template= `
    apiVersion: v1
    kind: Secret
    metadata:
      name:${this.secretName}
    type: ${this.types}
    data: 
      ${this.key}: ${this.value}`;

    if(this.key2 !== ""){
      template+=`
      ${this.key2}: ${this.value2}`
    }

      return template;
  }

  getProperties() {
    return {
      secretName: this.secretName,
      types: this.types,
      key: this.key,
      value: this.value,
      nameInDeployment: this.nameInDeployment,
      key2: this.key2,
      value2: this.value2,
      nameInDeployment2: this.nameInDeployment2,

    };
  }

  getInPort() {
    return this.ports.input;
  }

  getOutPort() {
    return this.ports.output;
  }

  onSubmit = (properties) => {
    let secretNode = this.model.nodes.filter((item) => item.id === this.id)[0];
    secretNode.secretName = properties.secretName;
    secretNode.key = properties.key;
    secretNode.value = properties.value;
    secretNode.types = properties.types;
    secretNode.nameInDeployment = properties.nameInDeployment;
    secretNode.key2 = properties.key2;
    secretNode.value2 = properties.value2;
    secretNode.nameInDeployment2 = properties.nameInDeployment2;

    if (
      !(
        Object.keys(this.getOutPort().links).length === 0 &&
        this.getOutPort().links.constructor === Object
      )
    ) {
      let confMapId =
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

      let confMapNode = this.model.nodes.filter(
        (item) => item.id === confMapId
      )[0];

      confMapNode.secretName = properties.secretName;
      confMapNode.secretKey = properties.key;
      confMapNode.secretKey2 = properties.key2;
      confMapNode.nameInDeployment = properties.nameInDeployment;
      confMapNode.nameInDeployment2 = properties.nameInDeployment2;

    }
    store.dispatch(
      updateModel(Object.assign({}, this.model), { selectedNode: null })
    );
  };
}
