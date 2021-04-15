import * as RJD from 'react-js-diagrams';
import { PodNodeWidgetFactory } from './PodNodeWidget';

export class PodWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('pod');
  }

  generateReactWidget(diagramEngine, node) {
    return PodNodeWidgetFactory({ node });
  }
}
