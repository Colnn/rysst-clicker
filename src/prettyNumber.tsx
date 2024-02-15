export default function prettyNumber(nr: any, precision: number) {
  if (nr >= 1e66) {
    nr = nr / 1e66;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' unvigintillion';
  } else if (nr >= 1e63) {
    nr = nr / 1e63;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' vigintillion';
  } else if (nr >= 1e60) {
    nr = nr / 1e60;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' novemdecillion';
  } else if (nr >= 1e57) {
    nr = nr / 1e57;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' octodecillion';
  } else if (nr >= 1e54) {
    nr = nr / 1e54;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' septendecillion';
  } else if (nr >= 1e51) {
    nr = nr / 1e51;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' sexdecillion';
  } else if (nr >= 1e48) {
    nr = nr / 1e48;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' quindecillion';
  } else if (nr >= 1e45) {
    nr = nr / 1e45;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' quattuordecillion';
  } else if (nr >= 1e42) {
    nr = nr / 1e42;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' tredecillion';
  } else if (nr >= 1e39) {
    nr = nr / 1e39;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' duodecillion';
  } else if (nr >= 1e36) {
    nr = nr / 1e36;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' undecillion';
  } else if (nr >= 1e33) {
    nr = nr / 1e33;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' decillion';
  } else if (nr >= 1e30) {
    nr = nr / 1e30;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' nonillion';
  } else if (nr >= 1e27) {
    nr = nr / 1e27;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' octillion';
  } else if (nr >= 1e24) {
    nr = nr / 1e24;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' septillion';
  } else if (nr >= 1e21) {
    nr = nr / 1e21;
    nr = nr.toFixed(precision);
    if (nr[nr.length - 1] === '0') {
      nr = nr.slice(0, -2);
    }
    return nr + ' sextillion';
  } else if (nr >= 1e18) {
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
