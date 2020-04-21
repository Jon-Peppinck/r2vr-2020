export interface Image {
  imgId: string | undefined;
  isAnnotated: boolean;
}

export interface InitialImage {
  imgFilename: string | null | undefined;
  imageId: string | undefined;
}
