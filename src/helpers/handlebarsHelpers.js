/**
 * Register helpers for a Handlebars instance
 * @param {Handlebars} hbs
 */

import { toPascalCase } from "./helpers";

export const registerHelpers = (hbs) => {
  try {
    hbs.registerHelper("upperCase", (value) => {
      return value.toUpperCase();
    });
  } catch (error) {
    console.error(error)
  }
 
  try {
    hbs.registerHelper("lowerCase", (value) => {
      return value.toLowerCase();
    });
  } catch (error) {
    console.error(error)
  }

  try {
    hbs.registerHelper("pascalCase", (value) => {
      return toPascalCase(value)
    });
  } catch (error) {
    console.error(error)
  }
  
  try {
    hbs.registerHelper("trimInput", (value) => {
      return value.trim()
    });
  } catch (error) {
    console.error(error)
  }
 
};
