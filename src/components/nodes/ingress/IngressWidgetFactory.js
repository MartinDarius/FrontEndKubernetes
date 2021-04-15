import * as RJD from 'react-js-diagrams';
import { IngressNodeWidgetFactory } from './IngressNodeWidget';

export class IngressWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('ingress');
  }

  generateReactWidget(diagramEngine, node) {
    return IngressNodeWidgetFactory({ node });
  }
}
