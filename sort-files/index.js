const fs = require("fs");
const path = require("path");

const CURRENT_DIR = process.argv[2] || "./";
const FILE_EXTENSIONS = {
  Images: [
    ".jpg",
    ".jpeg",
    ".jpe",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".svg",
    ".ico",
  ],
  Videos: [
    ".webm",
    ".mpeg",
    ".ogg",
    ".mp4",
    ".avi",
    ".wmv",
    ".mov",
    ".qt",
    ".flv",
  ],
  Audio: [".flac", ".mp3", ".wav"],
  Documents: [
    ".doc",
    ".docx",
    ".pdf",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
  ],
};


const findExtension = (file) => {
    const fileExtension = path.extname(file);
    const [folderName] =
      Object.entries(FILE_EXTENSIONS).find(([, extensions]) =>
        extensions.includes(fileExtension)
      ) || [];
  
    return folderName;
  };


  const createFolder = async (folder) => {
    try {
      await fs.promises.mkdir(folder, { recursive: true });
    } catch (error) {
      console.error("Unable to create directory: ", error);
    }
  };


  const moveFile = async (destination, file) => {
    const sourcePath = path.resolve(CURRENT_DIR, file);
    const destinationPath = path.join(destination, file);
  
    try {
      await fs.promises.rename(sourcePath, destinationPath);
      console.log(`${file} moved to ${destinationPath}`);
    } catch (error) {
      console.error("Unable to move file: ", error);
    }
  };

  const readFolder = async () => {
    try {
      const files = await fs.promises.readdir(CURRENT_DIR);
  
      for (const file of files) {
        const destination = findExtension(file);
        if (destination) {
          const destinationPath = path.resolve(CURRENT_DIR, destination);
          await createFolder(destinationPath);
          await moveFile(destinationPath, file);
        }
      }
    } catch (error) {
      console.error("Unable to scan directory: ", error);
    }
  };

  
  readFolder();
  