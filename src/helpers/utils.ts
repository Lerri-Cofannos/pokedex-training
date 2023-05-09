export function formatName(name: string): string {
  const words = name.split("-");
  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function formatNumber(number: number): string {
  const stringNumber = number.toString();
  const splitNumber = stringNumber.split(".");
  splitNumber[1] = splitNumber[1]
    ? splitNumber[1].slice(0, 2).padEnd(2, "0")
    : "00";
  return splitNumber.join(".");
}
