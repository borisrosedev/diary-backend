const dependencyChecker = require("./dependencyChecker");
// dépendance externe vis à vis de la fonction sum

function sum(a, b) {

  if (!dependencyChecker(a, "number") || !dependencyChecker(b, "number")) {
    throw new Error("Should be a number");
  }

  return a + b;
}

module.exports = sum;
