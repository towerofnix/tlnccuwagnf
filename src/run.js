var nearley = require('nearley');
var grammar = require('./grammar');
var interp = require('./interp');

export function run(code) {
  var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
  var asts = parser.feed(code).results;

  if (asts.length > 1) {
    console.warn('!! AMBIGUOUS SYNTAX !!');
    var escape = String.fromCharCode(27);
    asts.forEach(function(ast, i) {
      console.warn(JSON.stringify(ast, null, 0));
      console.warn('\n----------------------------\n');
    });
    console.warn('Please report this on the official issue tracker:');
    console.warn('https://github.com/liam4/tlnccuwagnf/issues');
    console.warn('Using first AST.');
  }

  var result = interp.interp(asts);
  return result;
}
