import { AppConfig } from "nuxt/schema";

import { uploadFile } from "../utils/fs";

const ALLOWED_TYPES = ["image/png", "image/jpeg"] as const;

export default eventHandler(async (event) => {
  const multipartData = (await readMultipartFormData(event)) ?? [];

  if (
    !multipartData.every((file) =>
      ALLOWED_TYPES.includes((file.type ?? "unknown") as any)
    )
  ) {
    throw createError({
      statusCode: 400,
      message: `Only [${ALLOWED_TYPES.join(", ")}] are allowed`,
    });
  }

  const { mediaDir } = useAppConfig(event) as AppConfig;

  const writeResponses = await Promise.allSettled(
    multipartData.map(uploadFile.bind(null, mediaDir))
  );

  const failed = writeResponses.filter(
    (response) => response.status === "rejected"
  );

  if (failed.length > 0) {
    throw createError({
      statusCode: 500,
      message: `Failed to upload ${failed.length} files`,
    });
  }
});
