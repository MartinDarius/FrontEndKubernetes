import * as RJD from 'react-js-diagrams';
import { PodNodeModel } from './PodNodeModel';

export class PodNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PodNodeModel');
  }

  getInstance() {
    return new PodNodeModel();
  }
}
