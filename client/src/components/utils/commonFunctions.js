// Add comma to a number
export function commaSeparator(num) {
  let number = num.toString().split(".");
  number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return number.join(".");
}
