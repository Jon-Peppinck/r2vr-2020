import { Entity } from 'aframe';

import { store } from '../rootStore';

import { AppActions } from '../models/actions';

import { INTERSECTION } from './models/actions';

const intersection = (els: Entity[]): AppActions => {
  console.log(655, 'intersectionAction.ts', els);
  return {
    type: INTERSECTION,
    els,
  };
};

const boundIntersection = (els: Entity[]) => store.dispatch(intersection(els));

export default boundIntersection;
