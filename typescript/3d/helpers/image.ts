import { store } from '../store/rootStore';

import { boundPushNewImage } from '../store/annotation/AnnotationAction';

export const getImage = (): Shared.ImageFile => {
  const canvas = document.getElementById('canvas')!;

  // The image filename is found through its class
  // Note: the class will be updated when the next image is called via the R console through a websocket connection between R2VR and the browser
  const fullName = canvas.getAttribute('class')!.split('/').pop() as string;
  const nameAndExtension = fullName.split('.');
  const [name, extension] = nameAndExtension;

  const state = store.getState();
  const { annotationReducer } = state;
  const currentImageNumber = annotationReducer.length;

  const imageFile: Shared.ImageFile = {
    fullName,
    name,
    extension,
    isAnnotated: false,
    uniqueNumberId: currentImageNumber,
  };
  return imageFile;
};

export const imageObserver = () => {
  const initialImage: Shared.ImageFile = getImage();
  const annotatedImages: Array<string> = [];
  annotatedImages.push(initialImage.name);

  const mutationObserver = new MutationObserver(() => {
    const newImage: Shared.ImageFile = getImage();
    const newImageName = newImage.name;
    if (!annotatedImages.includes(newImageName)) {
      annotatedImages.push(newImageName);
      boundPushNewImage(newImage);
    }
  });

  mutationObserver.observe(document.getElementById('canvas')!, {
    attributes: true,
    attributeFilter: ['src'],
  });
};
