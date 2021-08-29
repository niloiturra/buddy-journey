const parseToShortDate = (date) => {
  if (!date) {
    return;
  }

  return new Date(date).toISOString().split('T')[0];
};

const parseToLocaleDateString = (date) => {
  return new Date(date).toLocaleDateString();
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export { parseToShortDate, parseToLocaleDateString, toBase64 };
