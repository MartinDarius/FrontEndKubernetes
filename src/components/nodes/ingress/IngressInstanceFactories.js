import * as RJD from 'react-js-diagrams';
import { IngressNodeModel } from './IngressNodeModel';

export class IngressNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('IngressNodeModel');
  }

  getInstance() {
    return new IngressNodeModel();
  }
}
