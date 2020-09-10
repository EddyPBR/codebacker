import convertVolumeInCodeVolume from "./convertVolumeInCodeVolume";

function createVolumes(totalVolume: number){
  const volumes = [];
    for(let volume = 1; volume <= totalVolume; volume++) {
      const numVolume = convertVolumeInCodeVolume(volume);
      const volumeData = {
        status: "unchecked",
        numVolume,
      }
      volumes.push(volumeData);
    }
  return volumes;
}

export default createVolumes;