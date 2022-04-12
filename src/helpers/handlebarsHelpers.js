const registerHelpers = (hbs) => {
  hbs.registerHelper("upperCase", (value) => {
    return value.toUpperCase();
  });

  hbs.registerHelper("lowerCase", (value) => {
    return value.toLowerCase();
  });
};

module.exports = registerHelpers;
