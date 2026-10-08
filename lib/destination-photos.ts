/** Verified Commons sources; attribution and CC BY-SA 4.0 accompany every display. */
export type DestinationPhoto = { file: string; credit: string; alt: string };
export const destinationPhotos: Record<string, DestinationPhoto> = {
  "yankari-game-reserve": {
    file: "Yankari_Game_Reserve.jpg", credit: "Dotun55",
    alt: "A road through Yankari Game Reserve in Bauchi State",
  },
  "obudu-mountain-resort": {
    file: "Obudu_Mountain_Resort.jpg", credit: "Hadassah Photostorie group",
    alt: "Mountains at Obudu Mountain Resort in Cross River State",
  },
  "erin-ijesha-waterfall": {
    file: "Erin_Ijesha_Waterfalls.jpg", credit: "Baaadmus",
    alt: "Erin-Ijesha Waterfalls in Osun State",
  },
  "zuma-rock-gurara-falls": {
    file: "ZumaRock.jpg", credit: "Akinnaija",
    alt: "Zuma Rock in Niger State near Abuja",
  },
};

export function destinationPhotoUrls(photo: DestinationPhoto) {
  return {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/" + photo.file + "?width=720",
    creditUrl: "https://commons.wikimedia.org/wiki/File:" + photo.file,
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  };
}
