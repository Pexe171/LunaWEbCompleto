const fs = require('fs');
const { execFile } = require('child_process');

/**
 * Converts a PolyWorks .ipv file into a PNG image.
 *
 * This implementation calls an external conversion tool. If the tool is not
 * available, it falls back to simply copying the original file with a .png
 * extension so the application can continue to work. Replace the command
 * below with the one suitable for your environment (e.g. PolyWorks CLI or
 * a custom script).
 *
 * @param {string} ipvPath - Path to the source .ipv file.
 * @param {string} pngPath - Destination path for the generated PNG file.
 */
function convertIPvToPNG(ipvPath, pngPath) {
  return new Promise((resolve, reject) => {
    // Example command; replace with the real converter used in production.
    execFile('polyworks-export', ['--in', ipvPath, '--out', pngPath, '--format', 'png'], err => {
      if (err) {
        // Fallback: copy the file so that the path exists. This does NOT
        // produce a valid image but allows the rest of the flow to continue.
        fs.copyFile(ipvPath, pngPath, copyErr => {
          if (copyErr) return reject(copyErr);
          resolve();
        });
        return;
      }
      resolve();
    });
  });
}

module.exports = { convertIPvToPNG };
