export const getErrorMessagesArray = (errors) => {
  const errorMessages = [];

  try {
    if (errors) {
      for (const prop in errors) {
        errors[prop].forEach((error) => {
          errorMessages.push(error);
        });
      }
    }
  } catch {
    errorMessages.push('Ocorreu um erro desconhecido!');
  }

  return errorMessages;
};
