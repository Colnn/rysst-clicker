export default function prettyNumber(nr: any, precision: number) {
  if (nr >= 1e18) {
    nr = nr / 1e18;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' quintillion';
  } else if (nr >= 1e15) {
    nr = nr / 1e15;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' quadrillion';
  } else if (nr >= 1e12) {
    nr = nr / 1e12;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' trillion';
  } else if (nr >= 1e9) {
    nr = nr / 1e9;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' billion';
  } else if (nr >= 1e6) {
    nr = nr / 1e6;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' million';
  }
  nr = nr.toFixed(2);
  if (nr[nr.length - 1] === '0') {
    nr = nr.slice(0, -3);
  }
  return String(nr);
}
