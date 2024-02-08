export default function prettyNumber(nr: any, precision: number) {
  if (nr >= 1e9) {
    nr = nr / 1e9;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' trillion';
  } else if (nr >= 1e6) {
    nr = nr / 1e6;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' million';
  } else if (nr >= 1e3) {
    nr = nr / 1e3;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' thousand';
  }
  nr = nr.toFixed(2);
  if (nr[nr.length - 1] === '0') {
    nr = nr.slice(0, -3);
  }
  return String(nr);
}
