const postcss = require("postcss");

const THEMIFY = "rqthemify";

Object.defineProperty(exports, "__esModule", { value: true });
const defaultOptions = {
  palette: {},
  classPrefix: "",
};
/** supported color variations */
const ColorVariation = {
  DARK: "dark",
  LIGHT: "light",
};
function buildOptions(options) {
  if (!options) {
    throw new Error("options is required.");
  }
  // make sure we have a palette
  if (!options.palette) {
    throw new Error("The 'palette' option is required.");
  }
  return { ...defaultOptions, ...options };
}
/** Define the default variation */
const defaultVariation = ColorVariation.LIGHT;
/** An array of variation values  */
const variationValues = Object.values(ColorVariation);
/** An array of all non-default variations */
const nonDefaultVariations = variationValues.filter(function (v) {
  return v !== defaultVariation;
});
function themify(options) {
  /** Regex to get the value inside the themify parenthesis */
  const themifyRegExp = /rqthemify\(([^)]+)\)/gi;
  options = buildOptions(options);
  return function (root) {
    processRules(root);
  };
  function getThemifyValue(propertyValue) {
    /** Remove the start and end ticks * */
    propertyValue = propertyValue.replace(/'/g, "");
    const colorVariations = {};
    function normalize(value, variationName) {
      let parsedValue;
      try {
        if (typeof value === "string") {
          let color;
          let alpha = 1;
          if (value.includes(",")) {
            [color, alpha] = value.split(",").map((e) => e.trim());
          } else {
            color = value;
          }
          parsedValue = { light: [color, alpha], dark: [color, alpha] };
        } else {
          parsedValue = JSON.parse(value);
        }
      } catch (ex) {
        throw new Error(`fail to parse the following expression: ${value}.`);
      }
      const currentValue = parsedValue[variationName];

      if (!currentValue) {
        throw new Error(`${value} has one variation.`);
      }

      if (!Array.isArray(currentValue)) {
        parsedValue[variationName] = [currentValue, 1];
      } else if (!currentValue.length || !currentValue[0]) {
        throw new Error("Oops. Received an empty color!");
      }
      if (options.palette) return parsedValue[variationName];
    }
    // iterate through all variations
    variationValues.forEach(function (variationName) {
      // replace all 'themify' tokens with the right string
      colorVariations[variationName] = propertyValue.replace(
        themifyRegExp,
        function (occurrence, value) {
          // parse and normalize the color
          const parsedColor = normalize(value, variationName);
          // convert it to the right format
          return translateColor(parsedColor, variationName);
        }
      );
    });
    return colorVariations;
  }
  function translateColor(colorArr, variationName) {
    const [colorVar, alpha] = colorArr;
    // returns the real color representation
    const underlineColor = options.palette[variationName][colorVar];
    if (!underlineColor) {
      // variable is not mandatory in non-default variations
      if (variationName !== defaultVariation) {
        return null;
      }
      throw new Error(
        `The variable name '${colorVar}' doesn't exists in your palette.`
      );
    }
    return underlineColor;
  }
  function processRules(root) {
    root.walkRules(function (rule) {
      if (!hasThemify(rule.toString())) {
        return;
      }
      const aggragatedSelectorsMap = {};
      const aggragatedSelectors = [];
      const createdRules = [];
      const variationRules = ((_a = {}), (_a[defaultVariation] = rule), _a);
      rule.walkDecls(function (decl) {
        const propertyValue = decl.value;
        if (!hasThemify(propertyValue)) return;
        const property = decl.prop;
        const variationValueMap = getThemifyValue(propertyValue);
        const defaultVariationValue = variationValueMap[defaultVariation];
        decl.value = defaultVariationValue;
        // indicate if we have a global rule, that cannot be nested
        const createNonDefaultVariationRules = isAtRule(rule);
        // don't create extra CSS for global rules
        if (createNonDefaultVariationRules) {
          return;
        }
        // create a new declaration and append it to each rule
        nonDefaultVariations.forEach(function (variationName) {
          const currentValue = variationValueMap[variationName];
          // variable for non-default variation is optional
          if (!currentValue || currentValue === "null") {
            return;
          }
          // when the declaration is the same as the default variation,
          // we just need to concatenate our selector to the default rule
          if (currentValue === defaultVariationValue) {
            const selector = getSelectorName(rule, variationName);
            // append the selector once
            if (!aggragatedSelectorsMap[variationName]) {
              aggragatedSelectorsMap[variationName] = true;
              aggragatedSelectors.push(selector);
            }
          } else {
            // creating the rule for the first time
            if (!variationRules[variationName]) {
              const clonedRule = createRuleWithVariation(rule, variationName);
              variationRules[variationName] = clonedRule;
              // append the new rule to the array, so we can append it later
              createdRules.push(clonedRule);
            }
            const variationDecl = createDecl(
              property,
              variationValueMap[variationName]
            );
            variationRules[variationName].append(variationDecl);
          }
        });
      });

      if (aggragatedSelectors.length) {
        rule.selectors = rule.selectors.concat(aggragatedSelectors);
      }
      // append each created rule
      if (createdRules.length) {
        createdRules.forEach(function (r) {
          return root.append(r);
        });
      }
      let _a;
    });
  }
  /**
   * indicate if we have a global rule, that cannot be nested
   * @param rule
   * @return {boolean}
   */
  function isAtRule(rule) {
    return rule.parent && rule.parent.type === "atrule";
  }
  function createDecl(prop, value) {
    return postcss.decl({ prop, value });
  }
  /**
   * check if there's a themify keyword in this declaration
   * @param propertyValue
   */
  function hasThemify(propertyValue) {
    return propertyValue.indexOf(THEMIFY) > -1;
  }
  /**
   * Create a new rule for the given variation, out of the original rule
   * @param rule
   * @param variationName
   */
  function createRuleWithVariation(rule, variationName) {
    const selector = getSelectorName(rule, variationName);
    return postcss.rule({ selector });
  }
  /**
   * Get a selector name for the given rule and variation
   * @param rule
   * @param variationName
   */
  function getSelectorName(rule, variationName) {
    const selectorPrefix = `.${options.classPrefix || ""}${variationName}`;
    return rule.selectors
      .map(function (selector) {
        return `${selectorPrefix} ${selector}`;
      })
      .join(",");
  }
  function cloneEmptyRule(rule, overrideConfig) {
    const clonedRule = rule.clone(overrideConfig);
    clonedRule.removeAll();
    return clonedRule;
  }
}
module.exports = {
  themify: postcss.plugin("rqThemes", themify),
};
