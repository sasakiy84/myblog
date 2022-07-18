import { createInterface } from "readline";
import { createReadStream, createWriteStream } from "fs";

export const copyFileByLine = async (
  srcFilePath: string,
  newFilePath: string,
  inputLineTransformer: (inputLine: string, previousLine?: string) => string = (
    inputLine,
    _prevLine
  ) => inputLine
): Promise<void> => {
  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(newFilePath);
  const readLine = createInterface({
    input: readStream,
    output: writeStream,
  });

  let previousLine = "";
  readLine.on("line", (lineString) => {
    const transformedInputLine = inputLineTransformer(lineString, previousLine);
    writeStream.write(`${transformedInputLine}\n`);

    previousLine = lineString;
  });

  return new Promise((resolve) => {
    readLine.on("close", () => resolve());
  });
};
