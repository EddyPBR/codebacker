export default function convertVolumeInCodeVolume(volume: number) {
  let volumeCode = new String(volume);
  while (volumeCode.length < 4) {
    volumeCode = "0" + volumeCode;
  }
  return volumeCode;
}
