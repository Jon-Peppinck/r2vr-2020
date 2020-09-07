declare namespace Shared {
  export interface File {
    fullName: string;
    name: string;
    extension: string;
  }
  export interface ImageFile extends File {
    isAnnotated: boolean;
  }
}
