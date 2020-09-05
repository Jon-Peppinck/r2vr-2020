import { Entity } from 'aframe';

type Display = 'hide' | 'show';

const displayMenuOptions = (id: number, display: Display = 'hide'): void => {
  const coralOption = document.getElementById(`menuCoral${id}`)! as Entity;
  const notCoralOption = document.getElementById(
    `menuNotCoral${id}`
  )! as Entity;

  if (display === 'show') {
    coralOption.setAttribute('visible', 'true');
    notCoralOption.setAttribute('visible', 'true');
  } else {
    coralOption.setAttribute('visible', 'false');
    notCoralOption.setAttribute('visible', 'false');
  }

  // const isMenuDisplayed: boolean =
  //   coralOption.getAttribute('visible') &&
  //   notCoralOption.getAttribute('visible');
  // console.log('ismenudisplay4:', isMenuDisplayed);

  // if (isMenuDisplayed) {
  //   coralOption.setAttribute('visible', 'false');
  //   notCoralOption.setAttribute('visible', 'false');
  // }

  // if (isMenuDisplayed) {
  //   coralOption.setAttribute('visible', 'false');
  //   notCoralOption.setAttribute('visible', 'false');
  // }

  // else {
  //   coralOption.setAttribute('visible', 'true');
  //   notCoralOption.setAttribute('visible', 'true');
  // }
};

export default displayMenuOptions;
