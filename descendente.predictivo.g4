grammar CalcLL;

prog
  : line* EOF
  ;

line
  : expr NEWLINE
  | NEWLINE
  ;

expr
  : term (PLUS term)*
  ;

term
  : factor (STAR factor)*
  ;

factor
  : NUMBER
  | LPAREN expr RPAREN
  ;

PLUS: '+';
STAR: '*';
LPAREN: '(';
RPAREN: ')';
NUMBER: [0-9]+;
NEWLINE: '\n';
WS: [ \t\r]+ -> skip;
