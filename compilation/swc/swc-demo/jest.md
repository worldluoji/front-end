# @swc/jest
To make your Jest tests run faster, you can swap out the default JavaScript-based runner (ts-jest) 
for a drop-in Rust replacement(opens in a new tab) using SWC.

```
npm i -D jest @swc/core @swc/jest
```

jest.config.js
```
module.exports = {
 transform: {
 "^.+\\.(t|j)sx?$": "@swc/jest",
 },
};
```

<br>

## reference
https://swc.rs/docs/usage/jest