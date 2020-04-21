export type CoralBinary = 0 | 1;

export interface Data {
  image_id: string | undefined;
  image_file?: string | null | undefined; // same as InitialImage
  site: number;
  x?: number;
  y?: number;
  observation_number: number;
  observer?: string;
  is_coral?: CoralBinary;
}
