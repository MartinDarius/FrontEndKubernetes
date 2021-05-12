import * as RJD from 'react-js-diagrams';
import { StatefulSetNodeModel } from './StatefulSetNodeModel';

export class StatefulSetNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('StatefulSetNodeModel');
  }

  getInstance() {
    return new StatefulSetNodeModel();
  }
}
