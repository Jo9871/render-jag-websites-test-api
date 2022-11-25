export function formatCurrency(symbol, amount) {
  let aDigits = amount.toFixed(2).split(".");
  aDigits[0] = aDigits[0]
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})(?=\d)/g, "$1,")
    .split("")
    .reverse()
    .join("");
  return symbol + aDigits.join(".");
}
