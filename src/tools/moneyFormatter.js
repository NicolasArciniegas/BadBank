export function moneyFormatter(value) {
  // Formats numbers into money format
  const fueraComa = value.length % 3;
  const grupoMiles = Math.trunc(value.length / 3);
  // Partir str
  let miStr = "";
  if (fueraComa !== 0) {
    miStr = value.slice(0, fueraComa) + ".";
  }
  let count = 1;
  for (let i = fueraComa; i < value.length; i++) {
    if (count < 3) {
      miStr += value[i];
    } else {
      miStr += value[i];
      miStr += ".";
      count = 0;
    }
    count += 1;
  }
  return "$" + miStr.slice(0, miStr.length - 1);
}
