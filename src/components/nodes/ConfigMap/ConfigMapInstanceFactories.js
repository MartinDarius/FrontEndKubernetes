import * as RJD from 'react-js-diagrams';
import { ConfigMapNodeModel } from './ConfigMapNodeModel';

export class ConfigMapNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ConfigMapNodeModel');
  }

  getInstance() {
    return new ConfigMapNodeModel();
  }
}
