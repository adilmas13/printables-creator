type Position = 'NorthWest' | 'North' | 'NorthEast' | 'West' | 'Center' | "East" | 'SouthWest' | "South" | "SouthEast";

type CropData = {
    width: number; height: number; originX: number; originY: number;
}

type OverlayData = {
    filename: string; position: Position; offsetX: number; offsetY: number;
}

type MockData = {
    filename: string; crop: CropData; digitalDownload: OverlayData; placement: PlacementData
}

type PlacementData = {
    resize: { width: number; height: number }, crop: { width: number; height: number }, position: { offsetX: number; offsetY: number }
}