import { readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDirectories = ["src/assets", "src/public"];
const sourceExtensions = new Set([".png", ".jpg", ".jpeg", ".tif", ".tiff"]);
const options = new Set(process.argv.slice(2));
const keepOriginals = options.has("--keep-originals");
const dryRun = options.has("--dry-run");
const supportedOptions = new Set(["--keep-originals", "--dry-run"]);
const unsupportedOptions = [...options].filter((option) => !supportedOptions.has(option));

if (unsupportedOptions.length > 0) {
  console.error(`Unsupported option(s): ${unsupportedOptions.join(", ")}`);
  console.error("Usage: npm run images:webp [-- --keep-originals] [--dry-run]");
  process.exit(1);
}

async function listImages(directory) {
  const absoluteDirectory = path.join(projectRoot, directory);
  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const nestedEntries = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(absoluteDirectory, entry.name);
    if (entry.isDirectory()) return listImages(path.relative(projectRoot, entryPath));
    if (!entry.isFile() || !sourceExtensions.has(path.extname(entry.name).toLowerCase())) return [];
    return [entryPath];
  }));
  return nestedEntries.flat();
}

async function convertImage(sourcePath) {
  const destinationPath = `${sourcePath.slice(0, -path.extname(sourcePath).length)}.webp`;
  const temporaryPath = `${destinationPath}.${process.pid}.tmp`;
  const originalSize = (await stat(sourcePath)).size;
  const { data, info } = await sharp(sourcePath)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, alphaQuality: 80, effort: 6, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });

  if (dryRun) {
    console.log(`Would convert ${path.relative(projectRoot, sourcePath)} (${originalSize} bytes) to WebP (${data.byteLength} bytes, ${info.width}x${info.height}).`);
    return { originalSize, optimizedSize: data.byteLength };
  }

  const backupPath = `${destinationPath}.${process.pid}.bak`;
  await writeFile(temporaryPath, data);

  try {
    const metadata = await sharp(data).metadata();
    if (metadata.format !== "webp" || metadata.width !== info.width || metadata.height !== info.height) {
      throw new Error(`Output verification failed for ${path.relative(projectRoot, destinationPath)}.`);
    }

    let backedUpDestination = false;
    try {
      await rename(destinationPath, backupPath);
      backedUpDestination = true;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    try {
      await rename(temporaryPath, destinationPath);
    } catch (error) {
      if (backedUpDestination) await rename(backupPath, destinationPath);
      throw error;
    }

    if (backedUpDestination) await rm(backupPath);
    if (!keepOriginals) await rm(sourcePath);
  } finally {
    await rm(temporaryPath, { force: true });
  }

  console.log(`${path.relative(projectRoot, sourcePath)} -> ${path.relative(projectRoot, destinationPath)} (${originalSize} -> ${data.byteLength} bytes, ${info.width}x${info.height}).`);
  return { originalSize, optimizedSize: data.byteLength };
}

async function main() {
  const imageGroups = await Promise.all(imageDirectories.map(listImages));
  const sourceImages = imageGroups.flat();

  if (sourceImages.length === 0) {
    console.log("No PNG/JPEG/TIFF source images found in src/assets or src/public.");
    return;
  }

  const results = await Promise.all(sourceImages.map(convertImage));
  const originalTotal = results.reduce((total, result) => total + result.originalSize, 0);
  const optimizedTotal = results.reduce((total, result) => total + result.optimizedSize, 0);
  const reduction = Math.max(0, (1 - optimizedTotal / originalTotal) * 100);
  console.log(`${dryRun ? "Estimated" : "Converted"} ${results.length} image(s): ${originalTotal} -> ${optimizedTotal} bytes (${reduction.toFixed(1)}% smaller).`);
}

main().catch((error) => {
  console.error("Image optimization failed.", error);
  process.exitCode = 1;
});
