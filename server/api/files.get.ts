import { stat } from "fs/promises";

import { AppConfig } from "nuxt/schema";
import { getFolderContents, tryGetFolderOrCreate } from "../utils/fs";

async function getFiles(mediaDir: string) {
  await tryGetFolderOrCreate(mediaDir);

  let files = await getFolderContents(mediaDir);

  return Promise.all(
    files
      // TODO actual filter, also needs to be able to handle directories(recursion :( )
      .filter((file) => !file.includes("/") && file.endsWith(".png"))
      .map(async (fileName) => {
        const fileData = await stat(`${mediaDir}/${fileName}`);

        return {
          fileName,
          createdAt: ((ms: number) => {
            const date = new Date(ms);
            const formattedDate = date.toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return formattedDate;
          })(fileData.birthtimeMs),
        };
      })
  );
}

export default eventHandler(async (event) => {
  const { mediaDir } = useAppConfig(event) as AppConfig;

  try {
    const files = await getFiles(mediaDir);

    return files;
  } catch (e) {
    console.log(e);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
