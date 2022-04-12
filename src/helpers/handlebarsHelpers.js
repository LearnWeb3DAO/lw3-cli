/**
 * Register helpers for a Handlebars instance
 * @param {Handlebars} hbs
 */

export const registerHelpers = (hbs) => {
  hbs.registerHelper("upperCase", (value) => {
    return value.toUpperCase();
  });

  hbs.registerHelper("lowerCase", (value) => {
    return value.toLowerCase();
  });
};
