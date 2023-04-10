type Position =
  | "NorthWest"
  | "North"
  | "NorthEast"
  | "West"
  | "Center"
  | "East"
  | "SouthWest"
  | "South"
  | "SouthEast";

type OverlayData = {
  filename: string;
  position: Position;
  offsetX: number;
  offsetY: number;
};

type MockData = {
  filename: string;
  digitalDownload: OverlayData;
  designPlacement: PlacementData;
};

type PlacementData = {
  dimension: { width: number; height: number };
  offset: { x: number; y: number };
};
