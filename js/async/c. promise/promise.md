# Promise functions

The next static methods takes an iterable of promises as input and returns a single Promise. 

# 1. Promise.all
This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), 
with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

<br>

# 2. Promise.allSettled
This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), 
with an array of objects that describe the outcome of each promise.

<br>

# 3. Promise.any
This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. 
It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
第一个fullfiled的.

<br>

# 4. Promise.race
This returned promise settles with the eventual state of the first promise that settles.
Promise.race()方法主要关注 Promise 是否已完成，而不管其fullfiled还是rejected。