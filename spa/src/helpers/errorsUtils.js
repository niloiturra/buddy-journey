import { toastr } from 'react-redux-toastr';

const getErrorMessages = (errors) => {
  if (errors) {
    for (const prop in errors) {
      errors[prop].forEach((error) => {
        toastr.error('Opa!', error);
      });
    }
  }
};

export { getErrorMessages };
