# Test Driven Development

> 1. Make It Fail
> 2. Make It Pass
> 3. Refactor

## Workflow
*0. Write test*
write a test to prove the next small piece of functionality is missing or wrong

--> Run all the tests
All the tests should fail

*1. Write Code*
write the simplest production code to fix test

--> Run all the tests
All the tests should pass

***YOU NOW HAVE CODE THAT WORKS***

*2.Refactor*
Incremental refactoring the code untill its acceptable 

*** YOU NOW HAVE CODE YOU LIKE***

## Practical
##### pre reqs
- [jest](https://jestjs.io/docs/en/getting-started) for testing
  - install globally `npm install jest --global`
- [wallaby](https://wallabyjs.com/) for test running
  - install vscode plugin
  - get the [Web App](https://wallabyjs.com/docs/intro/get-started-wallaby-app.html)

1. before writing `index.js`, create `index.spec.js`
2. write first test as describe block
the first describe block is usualy the name of a feature or the entry point to the application
- the entry point is the point where execution begins
- Unit test == Unit of work
- Unit of work has entry point and exit point
- entry point is where function is invoked
  - use the name of the function
- exit point
  - return value
  - state change
  - output file

