export const isExtensionValid = (file) => {
  if (/\.(jpe?g|png|jpg)$/i.test(file.name) === false) {
    return false;
  }

  return true;
};

export const isSizeValid = (file) => {
  const size = Math.round(file.size / 1024);
  if (size >= 10240) {
    return false;
  }

  return true;
};
