export default function sum(a, b) {
  const isNum = (x) => typeof x === "number";
  const isNumArgs = isNum(a) && isNum(b);

  if (isNumArgs) {
    return a + b;
  } else {
    throw new TypeError();
  }
}
