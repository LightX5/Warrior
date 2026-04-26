import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const optimizedDir = path.join(publicDir, "optimized");
const manifestPath = path.join(projectRoot, "src", "data", "imageManifest.js");
const sourceFolders = ["brand", "portfolio", "team"];
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const responsiveBreakpoints = [480, 768, 1080, 1440, 1920];

const toPosix = (value) => value.split(path.sep).join("/");

const getVariantWidths = (originalWidth) => {
  const maxOutputWidth = Math.min(originalWidth, 1920);
  const widths = responsiveBreakpoints.filter((width) => width < maxOutputWidth);
  widths.push(maxOutputWidth);
  return [...new Set(widths)].sort((left, right) => left - right);
};

const readImageFiles = async (folderName) => {
  const folderPath = path.join(publicDir, folderName);
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(folderPath, entry.name))
    .filter((filePath) => supportedExtensions.has(path.extname(filePath).toLowerCase()))
    .sort((left, right) => left.localeCompare(right));
};

await fs.rm(optimizedDir, { recursive: true, force: true });
await fs.mkdir(optimizedDir, { recursive: true });

const manifest = {};

for (const sourceFolder of sourceFolders) {
  const imageFiles = await readImageFiles(sourceFolder);

  for (const imageFile of imageFiles) {
    const relativePath = toPosix(path.relative(publicDir, imageFile));
    const relativeDirectory = toPosix(path.dirname(relativePath));
    const extension = path.extname(relativePath);
    const baseName = path.basename(relativePath, extension);
    const metadata = await sharp(imageFile).metadata();

    if (!metadata.width || !metadata.height) {
      continue;
    }

    const variantWidths = getVariantWidths(metadata.width);
    const outputDirectory = path.join(optimizedDir, relativeDirectory);
    await fs.mkdir(outputDirectory, { recursive: true });

    const variants = [];

    for (const width of variantWidths) {
      const outputName = `${baseName}-${width}.webp`;
      const outputPath = path.join(outputDirectory, outputName);

      await sharp(imageFile)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(outputPath);

      variants.push({
        width,
        path: `/optimized/${toPosix(path.join(relativeDirectory, outputName))}`,
      });
    }

    const placeholderBuffer = await sharp(imageFile)
      .resize({ width: 32, withoutEnlargement: true })
      .webp({ quality: 42, effort: 4 })
      .toBuffer();

    manifest[`/${relativePath}`] = {
      width: metadata.width,
      height: metadata.height,
      placeholder: `data:image/webp;base64,${placeholderBuffer.toString("base64")}`,
      webpSrcSet: variants.map((variant) => `${variant.path} ${variant.width}w`).join(", "),
      defaultWebpSrc: variants.at(-1)?.path ?? null,
    };
  }
}

const manifestContents = `export const imageManifest = ${JSON.stringify(manifest, null, 2)};\n`;
await fs.writeFile(manifestPath, manifestContents, "utf8");

console.log(`Generated ${Object.keys(manifest).length} optimized image entries.`);
