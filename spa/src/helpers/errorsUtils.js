export const getErrorMessagesArray = (errors) => {
  const errorMessages = [];

  if (errors) {
    for (const prop in errors) {
      errors[prop].forEach((error) => {
        errorMessages.push(error);
      });
    }
  }

  return errorMessages;
};
