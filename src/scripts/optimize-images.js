// scripts/optimize-images.js
import { readdir, mkdir } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(__dirname, "../src/assets/images");
const outputDir = path.join(__dirname, "../public/images");
const sizes = [320, 640, 960, 1280, 1920]; // Responsive image sizes

async function ensureDirectoryExists(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

async function optimizeImages() {
  try {
    // Ensure output directory exists
    await ensureDirectoryExists(outputDir);

    // Get all image files from source directory
    const files = await readdir(sourceDir);

    // Process each image
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const fileExt = path.extname(file).toLowerCase();
      const fileName = path.basename(file, fileExt);

      // Skip non-image files
      if (
        ![".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(fileExt)
      ) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }

      // Skip SVG files (they're already optimized)
      if (fileExt === ".svg") {
        console.log(`Copying SVG file: ${file}`);
        await sharp(sourcePath).toFile(path.join(outputDir, file));
        continue;
      }

      console.log(`Processing: ${file}`);

      try {
        // Generate WebP version (except for GIFs)
        if (fileExt !== ".gif") {
          await sharp(sourcePath)
            .webp({ quality: 85 })
            .toFile(path.join(outputDir, `${fileName}.webp`));

          // Generate responsive WebP images
          for (const size of sizes) {
            await sharp(sourcePath)
              .resize({ width: size, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(path.join(outputDir, `${fileName}-${size}.webp`));
          }
        }

        // Keep original format but optimized
        const originalImage = sharp(sourcePath);

        // Apply appropriate optimization based on file type
        if (fileExt === ".jpg" || fileExt === ".jpeg") {
          originalImage.jpeg({ quality: 85, progressive: true });
        } else if (fileExt === ".png") {
          originalImage.png({ compressionLevel: 9, palette: true });
        } else if (fileExt === ".gif") {
          // GIFs are just copied as Sharp doesn't optimize them well
          originalImage.gif();
        }

        // Save optimized original
        await originalImage.toFile(path.join(outputDir, file));

        // Generate responsive images in original format
        for (const size of sizes) {
          const resizedImage = sharp(sourcePath).resize({
            width: size,
            withoutEnlargement: true,
          });

          if (fileExt === ".jpg" || fileExt === ".jpeg") {
            resizedImage.jpeg({ quality: 80, progressive: true });
          } else if (fileExt === ".png") {
            resizedImage.png({ compressionLevel: 9, palette: true });
          }

          await resizedImage.toFile(
            path.join(outputDir, `${fileName}-${size}${fileExt}`)
          );
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }

    console.log("Image optimization complete!");
  } catch (err) {
    console.error("Failed to optimize images:", err);
  }
}

// Run the optimization
optimizeImages();
