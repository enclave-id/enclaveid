import JSZip from 'jszip';

export function validateGoogleTakoutZip(zipFile: File) {
  JSZip.loadAsync(zipFile).then((zip) => {
    // Takeout/My Activity/Search/MyActivity.json

    Object.keys(zip.files).forEach((filename) => {
      console.log(filename);
    });
  });
}
