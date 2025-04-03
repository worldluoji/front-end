# at-rules
At-rules are CSS statements that instruct CSS how to behave. 
They begin with an at sign, '@' (U+0040 COMMERCIAL AT), 
followed by an identifier and includes everything up to the next semicolon, ';' (U+003B SEMICOLON), or the next CSS block, whichever comes first.

---

## regular at-rules
There are several regular at-rules, designated by their identifiers, each with a different syntax:
- @charset — Defines the character set used by the style sheet.
- @import — Tells the CSS engine to include an external style sheet.
- @namespace — Tells the CSS engine that all its content must be considered prefixed with an XML namespace.

---

## nested at-rules
- @media — A conditional group rule that will apply its content if the device meets the criteria of the condition defined using a media query.
- @supports — A conditional group rule that will apply its content if the browser meets the criteria of the given condition.
- @page — Describes the aspect of layout changes that will be applied when printing the document.
- @font-face — Describes the aspect of an external font to be downloaded.
- @keyframes — Describes the aspect of intermediate steps in a CSS animation sequence.
- @counter-style — Defines specific counter styles that are not part of the predefined set of styles.
- @font-feature-values (plus @swash, @ornaments, @annotation, @stylistic, @styleset and @character-variant) — Define common names in font-variant-alternates for feature activated differently in OpenType.
- @property — Describes the aspect of custom properties and variables.
- @layer – Declares a cascade layer and defines the order of precedence in case of multiple cascade layers.

---

## details
[media query](./media-query/media%20query.md)