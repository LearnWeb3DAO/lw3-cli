/**
 * Register helpers for a Handlebars instance
 * @param {Handlebars} hbs
 */

import { toPascalCase } from "./helpers";

export const registerHelpers = (hbs) => {
  try {
    hbs.registerHelper("upperCase", (value) => {
      if (typeof value === "string") {
        return value.toUpperCase();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    hbs.registerHelper("lowerCase", (value) => {
      if (typeof value === "string") {
        return value.toLowerCase();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
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
    hbs.registerHelper("pascalCase", (value) => {
      if (typeof value === "string") {
        return toPascalCase(value);
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    hbs.registerHelper("trimInput", (value) => {
      if (typeof value === "string") {
        return value.trim();
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    hbs.registerHelper(
      "when",
      function (operand_1, operator, operand_2, options) {
        var operators = {
            eq: function (l, r) {
              return l == r;
            },
          },
          result = operators[operator](operand_1, operand_2);

        if (result) return options.fn(this);
        else return options.inverse(this);
      }
    );
  } catch (error) {
    console.error(error);
  }
};
