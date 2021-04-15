import * as RJD from 'react-js-diagrams';
import { ConnectionNodeModel } from './ConnectionNodeModel';

export class ConnectionNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ConnectionNodeModel');
  }

  getInstance() {
    return new ConnectionNodeModel();
  }
}
