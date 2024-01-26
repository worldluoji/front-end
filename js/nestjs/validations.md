# other validations
## 1. zod
The Zod library allows you to <strong>create schemas in a straightforward way</strong>, with a readable API. 
Let's build a validation pipe that makes use of Zod-based schemas.
```
npm install --save zod
```
[demo] -> (./src/pipes/zod-validation.pip.ts)

The techniques require TypeScript and are not available if your app is written using vanilla JavaScript.

<br>

## 2. class validator (recommand)
Nest works well with the class-validator library. 
This powerful library allows you to <strong>use decorator-based validation</strong>. 
Decorator-based validation is extremely powerful, especially when combined with Nest's Pipe capabilities since we have access to the metatype of the processed property. 
```
npm i --save class-validator class-transformer

or

pnpm add class-validator class-transformer
```

<br>

## reference
- https://github.com/typestack/class-validator
