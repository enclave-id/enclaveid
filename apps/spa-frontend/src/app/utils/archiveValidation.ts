import JSZip from 'jszip';

export function validateGoogleTakoutZip(zipFile: File): Promise<boolean> {
  return JSZip.loadAsync(zipFile).then((zip) => {
    const myActivityFile = zip.file(
      'Takeout/My Activity/Search/MyActivity.json',
    );

    return !!myActivityFile;
  });
}
