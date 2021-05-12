import * as RJD from 'react-js-diagrams';
import { StatefulSetNodeWidgetFactory } from './StatefulSetNodeWidget';

export class StatefulSetWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('statefulSet');
  }

  generateReactWidget(diagramEngine, node) {
    return StatefulSetNodeWidgetFactory({ node });
  }
}
