interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Crops an image based on the provided crop area
 * @param imageSrc - The source of the image to crop
 * @param cropArea - The area to crop (x, y, width, height)
 * @returns A promise that resolves to the cropped image data URL
 */
export const cropImage = (imageSrc: string, cropArea: CropArea): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set canvas dimensions to the cropped area
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      
      // Draw the cropped portion of the image onto the canvas
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );
      
      // Convert canvas to data URL
      const croppedImageUrl = canvas.toDataURL('image/jpeg');
      resolve(croppedImageUrl);
    };
    
    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};
