export const processFiles = (vin, files) => {
  const img = [];
  const cf = [];
  const insp = [];

  files.forEach((d) => {
    if (d.vin === vin) {
      switch (d.fileType) {
        case "images":
          img.push(d.signedUrl);
          break;
        case "carfax":
          cf.push(d.signedUrl);
          break;
        case "inspection":
          insp.push(d.signedUrl);
          break;
        default:
          console.log("invalid fileType");
      }
    }
  });

  return {
    vin: vin,
    images: img,
    carfax: cf,
    inspection: insp,
  };
};
