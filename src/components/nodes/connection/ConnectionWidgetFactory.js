import * as RJD from 'react-js-diagrams';
import { ConnectionNodeWidgetFactory } from './ConnectionNodeWidget';

export class ConnectionWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('connection');
  }

  generateReactWidget(diagramEngine, node) {
    return ConnectionNodeWidgetFactory({ node });
  }
}
