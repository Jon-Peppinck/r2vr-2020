const getImage = (): Shared.ImageFile => {
  const canvas = document.getElementById('canvas')!;

  // The image filename is found through its class
  // Note: the class will be updated when the next image is called via the R console through a websocket connection between R2VR and the browser
  const fullName = canvas.getAttribute('class')!.split('/').pop() as string;
  const nameAndExtension = fullName.split('.');
  const [name, extension] = nameAndExtension;

  const imageFile: Shared.ImageFile = {
    fullName,
    name,
    extension,
    isAnnotated: false,
  };
  return imageFile;
};

const imageObserver = () => {
  const initialImage: Shared.ImageFile = getImage();
  const annotatedImages: Array<string> = [];
  annotatedImages.push(initialImage.name);

  const mutationObserver = new MutationObserver(() => {
    const newImage: Shared.ImageFile = getImage();
    const newImageName = newImage.name;
    if (!annotatedImages.includes(newImageName)) {
      annotatedImages.push(newImageName);
      console.log(7, 'fired!', annotatedImages);
    }
  });

  mutationObserver.observe(document.getElementById('canvas')!, {
    attributes: true,
    attributeFilter: ['src'],
  });
};

export default imageObserver;
