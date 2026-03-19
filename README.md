# PA 19.03.2026

Este repositorio contiene los ejemplos sobre análisis sintáctico descendente para expresiones aritméticas basado en la gramática trabajada en clase.

## Objetivo

Comparar distintas formas de implementar y analizar la misma gramatica: parser manual descendente recursivo y parser descendente predictivo con tabla generado automáticamente con ANTLR.

## Contenido

- `descendente.recursivo.js`: version en JavaScript del parser descendente recursivo para la gramática indicando dónde se utilizan
los conjuntos FIRST y los FOLLOW.
- `descendente.predictivo.g4`: propuesta equivalente de la gramática en formato ANTLR4