async function getFileHash() {
  const [fileHandle] = await showOpenFilePicker();
  const file = await fileHandle.getFile();
  const fileBinary = await file.arrayBuffer();
  const hashBinary = await crypto.subtle.digest("SHA-1", fileBinary);
  return [...new Uint8Array(hashBinary)]
    .map((i) => i.toString(16).padStart(2, "0"))
    .join("");
}
