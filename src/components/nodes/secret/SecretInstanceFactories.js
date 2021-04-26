import * as RJD from 'react-js-diagrams';
import { SecretNodeModel } from './SecretNodeModel';

export class SecretNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('SecretNodeModel');
  }

  getInstance() {
    return new SecretNodeModel();
  }
}
