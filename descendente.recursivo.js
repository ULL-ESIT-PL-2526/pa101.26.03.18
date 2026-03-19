let lookahead;
const tokens = [];
let pos = 0;

function nextToken() {
  lookahead = tokens[pos++] ?? '$';
}

function match(expected) {
  if (lookahead === expected) {
    nextToken();
  } else {
    throw new Error(`Error: se esperaba '${expected}', se obtuvo '${lookahead}'`);
  }
}

// E → T E'  (secuencia)
// No hay alternativas ni producción vacía, así que no se necesita
// consultar FIRST ni FOLLOW. Se llama directamente a parseT y parseE_prima.
function parseE() {
  parseT();
  parseE_prima();
}

// E' → + T E' | ε  (repetición)
//
// Se usa FIRST(E' → + T E') = { + } como condición del while.
// Mientras el lookahead sea '+', sabemos que debemos aplicar
// la alternativa no vacía.
//
// Cuando el lookahead NO es '+', se aplica la producción vacía ε.
// Implícitamente se está comprobando que el lookahead pertenece
// a FOLLOW(E') = { ), $ }, que son los únicos tokens válidos
// después de E'. Si el lookahead fuera cualquier otro token,
// el error lo detectará la función que llamó a parseE_prima.
function parseE_prima() {
  // FIRST(E' → + T E') = { + }
  while (lookahead === '+') {
    match('+');
    parseT();
    // Al final del bucle se vuelve a comprobar FIRST
  }
  // Al salir del bucle, implícitamente lookahead ∈ FOLLOW(E') = { ), $ }
}

// T → F T'  (secuencia)
// No hay alternativas ni producción vacía, así que no se necesita
// consultar FIRST ni FOLLOW. Se llama directamente a parseF y parseT_prima.
function parseT() {
  parseF();
  parseT_prima();
}

// T' → * F T' | ε  (repetición)
//
// Se usa FIRST(T' → * F T') = { * } como condición del while.
// Mientras el lookahead sea '*', sabemos que debemos aplicar
// la alternativa no vacía.
//
// Cuando el lookahead NO es '*', se aplica la producción vacía ε.
// Implícitamente se comprueba que el lookahead pertenece
// a FOLLOW(T') = { +, ), $ }.
function parseT_prima() {
  // FIRST(T' → * F T') = { * }
  while (lookahead === '*') {
    match('*');
    parseF();
    // Al final del bucle se vuelve a comprobar FIRST
  }
  // Al salir del bucle, implícitamente lookahead ∈ FOLLOW(T') = { +, ), $ }
}

// F → ( E ) | num  (alternativa sin producción vacía)
//
// Hay dos alternativas y ninguna es vacía, por lo que solo
// se necesita FIRST para decidir qué rama tomar.
// No se necesita FOLLOW porque F nunca deriva en ε.
//
// FIRST(F → ( E )) = { ( }
// FIRST(F → num)   = { num }
//
// Los dos conjuntos son disjuntos, así que el parser
// puede decidir de forma determinista con un solo token.
function parseF() {
  if (lookahead === '(') {
    // lookahead ∈ FIRST(F → ( E )) = { ( }
    match('(');
    parseE();
    match(')');
  } else if (lookahead === 'num') {
    // lookahead ∈ FIRST(F → num) = { num }
    match('num');
  } else {
    // lookahead ∉ FIRST(F → ( E )) ∪ FIRST(F → num)
    // F no tiene producción vacía, así que cualquier
    // otro token es un error sintáctico
    throw new Error(`Error: se esperaba '(' o 'num', se obtuvo '${lookahead}'`);
  }
}
