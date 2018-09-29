
const generateError = (status, err) => {
  let message = 'Something went wrong :(';

  if (typeof err === 'string') {
    message = err;
  } else if (typeof err === 'object' && err.hasOwnProperty('message')) {
    message = err.message;
  }

  return {
    error: {
      status,
      message,
    }
  };
};

module.exports = {
  generateError,
};
