export const calculateMaskArea = (maskPixelCount, refPixelCount, refRealArea_m2) => {
  if (!maskPixelCount || !refPixelCount || !refRealArea_m2) {
    throw new Error("Missing parameters for area calculation");
  }
  // scale factor: 1 pixel mask = x m²
  const scaleFactor = refRealArea_m2 / refPixelCount;
  const area_m2 = maskPixelCount * scaleFactor;

  return {
    area_m2,
    scaleFactor
  };
};

//maxPixelCount = pixel count of Damage Area (based on Segmentation mask)
//refPixelCount = pixel count of Reference Object