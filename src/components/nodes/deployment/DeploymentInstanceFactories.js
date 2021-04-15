import * as RJD from 'react-js-diagrams';
import { DeploymentNodeModel } from './DeploymentNodeModel';

export class DeploymentNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('DeploymentNodeModel');
  }

  getInstance() {
    return new DeploymentNodeModel();
  }
}
