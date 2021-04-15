import * as RJD from 'react-js-diagrams';
import { ServiceNodeModel } from './ServiceNodeModel';

export class ServiceNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ServiceNodeModel');
  }

  getInstance() {
    return new ServiceNodeModel();
  }
}
