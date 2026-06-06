// src/services/imageProcessor.ts

import imageCompression from "browser-image-compression";

export interface ImageRequirements {
  width: number;
  height: number;
  maxSizeKB: number;
}

export async function processImage(
  file: File,
  requirements: ImageRequirements
): Promise<File> {

  // Step 1: Resize image
  const resizedBlob = await resizeImage(
    file,
    requirements.width,
    requirements.height
  );

  // Step 2: Compress image
  const compressedFile =
    await imageCompression(
      new File(
        [resizedBlob],
        file.name.replace(/\.[^/.]+$/, ".jpg"),
        {
          type: "image/jpeg",
        }
      ),
      {
        maxSizeMB:
          requirements.maxSizeKB / 1024,

        useWebWorker: true,
      }
    );

  return compressedFile;
}

/**
 * Resize image using canvas
 */
async function resizeImage(
  file: File,
  width: number,
  height: number
): Promise<Blob> {

  return new Promise(
    (resolve, reject) => {

      const img = new Image();

      const objectUrl =
        URL.createObjectURL(file);

      img.onload = () => {

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) {
          reject(
            new Error(
              "Canvas context not available"
            )
          );
          return;
        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        canvas.toBlob(
          (blob) => {

            if (!blob) {
              reject(
                new Error(
                  "Failed to generate image"
                )
              );
              return;
            }

            resolve(blob);

            URL.revokeObjectURL(
              objectUrl
            );

          },
          "image/jpeg",
          0.95
        );
      };

      img.onerror = () => {
        reject(
          new Error(
            "Failed to load image"
          )
        );
      };

      img.src = objectUrl;
    }
  );
}

/**
 * Check final file size
 */
export function getFileSizeKB(
  file: File
): number {
  return Number(
    (file.size / 1024).toFixed(2)
  );
}

/**
 * Validate file before processing
 */
export function validateImage(
  file: File
): boolean {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  return allowedTypes.includes(
    file.type
  );
}