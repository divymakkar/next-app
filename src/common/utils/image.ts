export const getMediaFileType = (fileName: string) => {
  const fileExtensions = /(?:\.([^.]+))?$/;
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "svg",
    "bmp",
    "tiff",
  ];
  const videoExtensions = ["3gp", "mp4", "webm", "ogg"];
  const fileExtensionParse = fileExtensions.exec(fileName);
  const fileExtension = fileExtensionParse ? fileExtensionParse[1] : "";
  let fileType;

  if (imageExtensions.includes(fileExtension.toLowerCase())) {
    fileType = "image";
  } else if (videoExtensions.includes(fileExtension.toLowerCase())) {
    fileType = "video";
  }

  return fileType;
};
