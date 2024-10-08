import { mkdir, readdir, stat, writeFile } from "fs/promises";

export class FsIncorrectType extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FsIncorrectType";
  }
}

export async function tryGetFolderOrCreate(path: string) {
  try {
    const res = await stat(path);
    if (!res.isDirectory()) {
      throw new FsIncorrectType(`${path} is not a directory`);
    }
  } catch (error: any) {
    // ENOENT means the path doesn't exist
    if (["ENOENT"].includes(error.code)) {
      await mkdir(path, { recursive: true });
    } else {
      throw error;
    }
  }
}

export async function getFolderContents(path: string) {
  await tryGetFolderOrCreate(path);
  return await readdir(path);
}

export async function uploadFile(directory: string, file: any) {
  await tryGetFolderOrCreate(directory);

  const fullFileName = file.filename.split("/").pop() as string;
  const extension = fullFileName.split(".").pop();

  const fileName = `${Date.now()}.${extension}`;

  return writeFile(`${directory}/${fileName}`, file.data);
}
