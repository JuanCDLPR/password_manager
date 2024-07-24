String.prototype.toDecimal = function () {
  let NumericString = this.valueOf().replace(/[^0-9\.]/g, "");
  const puntos = NumericString.split(".");
  if (puntos.length >= 3) {
    NumericString = puntos[0] + ".";
    puntos.map((numero, index) => {
      if (index > 0) {
        NumericString += numero;
      }
    });
  }
  return NumericString;
};

String.prototype.toNumber = function () {
  return this.valueOf().replace(/\D/g, "");
};

String.prototype.toValidInput = function () {
  return this.valueOf().replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ0-9\s]/g, "");
};

String.prototype.toValidInputVentas = function () {
  return this.valueOf().replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ0-9-\s]/g, "");
};

String.prototype.toEdades = function () {
  /* let NumericString = this.valueOf().replace(/[^0-9\,]/g, "");
    return NumericString; */

  let inputString = this.valueOf();
  let result = "";
  let consecutiveCommas = 0;

  for (let i = 0; i < inputString.length; i++) {
    const currentChar = inputString[i];

    if (/[0-9]/.test(currentChar)) {
      result += currentChar;
      consecutiveCommas = 0;
    } else if (currentChar === ",") {
      if (consecutiveCommas === 0) {
        result += currentChar;
        consecutiveCommas = 1;
      }
    }
  }

  return result;
};
