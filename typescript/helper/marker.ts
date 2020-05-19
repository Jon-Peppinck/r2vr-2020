import { store } from '../store/rootStore';

const getMarkerId = (): number | never => {
  const intersectedEntities = store.getState().intersectionReducer;
  console.log(99, intersectedEntities);
  return 101;
  // Extract the ID number of the element selected iff menu option is intersected

  // els[0].id exists since all entities that relate to being a marker also have a corresponding ID  associated with it

  // Regular Expression captures the digits associated with the ID
  // const matches = intersectedEntities.id.match(/(\d+)/);
  // console.log(909, 'matches: ', matches);
  // // Parse the string to a number so the corresponding ID can be used
  // // return +matches[0];
  // if (matches) {
  //   return <number>+matches[0];
  // }
  // throw new Error(
  //   'It should never occur that a marker is intersected and it does not contain a corresponding ID'
  // );
};

export default getMarkerId;
