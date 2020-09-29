import { store } from './store/rootStore';

import boundGetMetaData from './store/metadata/MetaDataAction';
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

  const metaData = document.getElementById('metaData')!.className;
  const moduleAndType = metaData.split('/');
  const [module, annotationType] = moduleAndType as [
    Shared.MetaDataModule,
    Shared.MetaDataAnnotationType
  ];
  boundGetMetaData({ module, annotationType });
});
