import * as RJD from 'react-js-diagrams';
import { DeploymentNodeWidgetFactory } from './DeploymentNodeWidget';

export class DeploymentWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('deployment');
  }

  generateReactWidget(diagramEngine, node) {
    return DeploymentNodeWidgetFactory({ node });
  }
}
