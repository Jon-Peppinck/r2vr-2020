import { store } from './store/rootStore';

import boundGetUser from './store/user/UserAction';

const render = () => {
  return store.getState();
};
render();
store.subscribe(render);

document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('user')!.className;
  const user = {
    name,
  };
  boundGetUser(user);
});
