/**
 * Register helpers for a Handlebars instance
 * @param {Handlebars} hbs
 */

import { toPascalCase } from "./helpers";

export const registerHelpers = (hbs) => {
  try {
    /**
     * Changes string into upper case
     * @param {string} value - The string to change into uppercase 
     * @returns {string} - The converted string
     */
    hbs.registerHelper("upperCase", (value) => {
      if (typeof value === "string") {
        return value.toUpperCase();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    /**
     * Changes string into lowercase
     * @param {string} value - The string to change into lowercase
     * @returns {string} - The converted string
     */
    hbs.registerHelper("lowerCase", (value) => {
      if (typeof value === "string") {
        return value.toLowerCase();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    /**
     * Changes string into camelCase
     * @param {string} value - The string to change into camel case
     * @returns {string} - The converted string
     */
    hbs.registerHelper("camelCase", (value) => {
      if (typeof value === "string") {
        return value
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
      }
    });
  } catch (error) {
    console.log(error);
  }

  try {
    /**
     * Changes string into pascal case
     * @param {string} value - The string to convert into pascal case
     * @returns {string} - The converted string
     */
    hbs.registerHelper("pascalCase", (value) => {
      if (typeof value === "string") {
        return toPascalCase(value);
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    /**
     * Removes space from the start & end of the string
     * @param {string} - The string to remove the spaces from
     * @returns {string} - The cleared string
     */
    hbs.registerHelper("trimInput", (value) => {
      if (typeof value === "string") {
        return value.trim();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    /**
     * Compares two operands
     * @param {string} v1 - The first argument
     * @param {string} v2 - The second argument
     * @param {object} options - The options object
     * @returns {boolean} - The output of the comparison
     */
    hbs.registerHelper('ifCond', (v1, v2, options) => {
      if (typeof v1 === "string" && typeof v2 === "string") {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);

      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    /**
     * Gets the network chain ID
     * @param {string} network - The network name
     * @returns {number} - The chain Id for a particular network
     */
    hbs.registerHelper('getChainID', (network) => {
      if (typeof network === "string") {
        switch (network) {
          case "Rinkeby":
            return 4;
          case "Ropsten":
            return 3;
          case "Mumbai":
            return 8001;
          default:
            return null
        }
      }
    })

  } catch (error) {
    console.error(error)
  }
};
