const formValidationsRegex = Object.freeze({
  ONLY_LETTERS: /^([A-zÀ-ÖØ-öø-ÿ]+\s)*[A-zÀ-ÖØ-öø-ÿ]+$/,
  ONLY_NUMBERS: /^[0-9]+$/,
  PHONE:
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
});

export default formValidationsRegex;
