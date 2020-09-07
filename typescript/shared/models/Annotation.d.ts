declare namespace Shared {
  export type Marker = { id: number; isCoral: Shared.CoralBinary };

  export interface Annotation {
    image: Shared.ImageFile;
    markers: Marker[];
  }
}
