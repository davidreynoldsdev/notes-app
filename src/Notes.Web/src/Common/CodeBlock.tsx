import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
  value: string,
  language: string
};

const supportedLanguages = ["css","clike","javascript","abap","actionscript","ada","apacheconf","apl","applescript","arduino","arff","asciidoc","asm6502","aspnet","autohotkey","autoit","bash","basic","batch","bison","brainfuck","bro","c","csharp","cpp","coffeescript","clojure","crystal","csp","css-extras","d","dart","diff","django","docker","eiffel","elixir","elm","erb","erlang","fsharp","flow","fortran","gedcom","gherkin","git","glsl","gml","go","graphql","groovy","haml","handlebars","haskell","haxe","http","hpkp","hsts","ichigojam","icon","inform7","ini","io","j","java","jolie","json","julia","keyman","kotlin","latex","less","liquid","lisp","livescript","lolcode","lua","makefile","markdown","markup-templating","matlab","mel","mizar","monkey","n4js","nasm","nginx","nim","nix","nsis","objectivec","ocaml","opencl","oz","parigp","parser","pascal","perl","php","php-extras","plsql","powershell","processing","prolog","properties","protobuf","pug","puppet","pure","python","q","qore","r","jsx","tsx","renpy","reason","rest","rip","roboconf","ruby","rust","sas","sass","scss","scala","scheme","smalltalk","smarty","sql","soy","stylus","swift","tap","tcl","textile","tt2","twig","typescript","vbnet","velocity","verilog","vhdl","vim","visual-basic","wasm","wiki","xeora","xojo","xquery","yaml"];

const CodeBlock: React.FC<IProps> = (props) => {
  var supportedLanguage = supportedLanguages.find(x => x === props.language);
  var language = supportedLanguage || "csharp";

  return (
    <SyntaxHighlighter language={language} style={vs}>
      {props.value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;