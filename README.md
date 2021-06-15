# Unit testing and code coverage with Mocha, Chai and Karma

In the previous post, we learnt about basic fundamentals about Code coverage. So, how can we generate a coverage report? The flow is quite simple here:
1. Write some unit tests
2. Run every unit test
3. Generate the report based on how the program runs these test cases

This post will mainly focus on the implementation of a easy-to-understand project to demonstrate and guide you through the process of solving this problem.

## Ideas
We will create a straightforward function to test if an input password satisfied the requirements to be a secured one, including:
- Have at least one upper case letter
- Have at least one lower case letter
- Have at least one digit
- Have at least one special character
- Have at least eight characters long
- Have no empty string or whitespace

The code will be written in Javascript since the tools we going to use here are Javacript-based

## Create a project
The target file structure for this source code will be:

![](https://i.imgur.com/UUaRXrs.png)

1. `src` folder: contains the source code that we want to test
2. `test` folder: contains the test cases
3. `coverage` folder: contains code coverage report
4. others fildes: configuration of the project 

To create a simple Node.js project in Visual Studio code, run 

```bash=
npm init
```

The prompt will ask us to adjust some settings that fit us the most. You can just config it as your needs. This will automatically generate us a `package.json` file which defines the settings and dependencies of the project

Example terminal input and package file:
* Terminal
![](https://i.imgur.com/qkT0PZX.png)

* `package.json`
```json=
{
  "name": "code-coverage-w2",
  "version": "1.0.0",
  "description": "Simple code coverage demo",
  "main": "main.js",
  "scripts": {
    "test": "npx karma start"
  },
  "author": "G2 Group",
  "license": "ISC"
}
```
## Dependencies

### Supported tools

#### Mocha
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

#### Chai
Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

#### Karma
Karma is a test runner for JavaScript that runs on Node.js. It is very well suited to testing AngularJS or any other JavaScript projects. Using Karma to run tests using one of many popular JavaScript testing suites (Jasmine, Mocha, QUnit, etc.) and have those tests executed not only in the browsers of your choice, but also on the platform of your choice (desktop, phone, tablet.) Karma is highly configurable, integrates with popular continuous integration packages (Jenkins, Travis, and Semaphore) and has excellent plugin support.

### Installation
To use those tools in the project, defines these dependencies in `package.json`:
```json=
"devDependencies": {
    "mocha": "~9.0.0",
    "chai": "~4.3.4",
    "karma": "~6.3.4",
    "karma-mocha": "~2.0.1",
    "karma-chai": "~0.1.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-firefox-launcher": "~2.1.1",
    "karma-coverage": "~2.0.3"
}
```

As you can see, it includes tool packages and its plugin in Karma. Also, we need browser launcher to run Karma on it and a code coverage report plugin.

Then, run
```bash=
npm install
```
to install all of the dependencies

## Implement demo

### Prepare a Test unit
Here is the implementation of the problem mentioned in the [Ideas](##Ideas) section using Javascript
```javascript=
function validatePassword(password) {
    let upp, low, num, sym, tot = 0
    let i = 0
    let character = ''
    while (i <= password.length) {
        character = password.charAt(i);
        if (!isNaN(character * 1)) {
            num = true
            tot++
        } else if (character.toLowerCase() != character.toUpperCase() && character == character.toUpperCase()) {
            upp = true
            tot++
        } else if (character.toLowerCase() != character.toUpperCase() && character == character.toLowerCase()) {
            low = true
            tot++
        } else if (isSpecial(character)) {
            sym = true
            tot++
        } else {
            return false
        }
        i++
    }

    if (!upp || !low || !num || !sym || tot < 8) {
        return false
    }

    return true
}

```

### Write some unit tests
To write a test, we use Mocha and Chai:
- Mocha to define a test case
- Chai to assert the test result with the expected result
```javascript=
describe('main', function () {
    describe('#validatePassword()', function () {
        it('should return true if password pass all the requirements', function () {
            assert.equal(true, validatePassword("Tuitest@123"));
        });

        it('should return false if there is no uppercase letter, no number, no symbol', function () {
            assert.equal(false, validatePassword("notvalidate"));
        });
    });
});
```

### Setup Karma server (with code coverage)
To setup a Karma server, run:
```bash=
npx karma init
```
or if you have installed `karma-cli` as a global package:
```bash=
karma init
```

The terminal will ask you to set some configurations for Karma. Here is an example settings for this project

![](https://i.imgur.com/5sLNKEh.png)

After that, `karma.conf.js` file will be generated automatically. We will open that file to set some manual settings
* Set testing framework: Add 'Chai'
```json=
frameworks: ['mocha', 'chai'],
```
* Config code coverage report:
    * (1) Define that Karma generates the report before it is served
    * (2) Add coverage as a reporter
    * (3) Set the output of the reporter to be `html` in `coverage` folder

```json=
// 1
preprocessors: {
    'src/**/*.js': ['coverage']
},

// 2
reporters: ['progress', 'coverage'],

// 3
coverageReporter: {
    type: 'html',
    dir: 'coverage/'
}
```
## Run server and result

You can start using Karma to run test cases using:
```bash=
npx karma start
```
or if you have set the test command in `package.json`
```bash=
npm test
```
### Test results
If Karma is served, you will see its status in the browsers that you defined in the config file
![](https://i.imgur.com/jXxcSOt.png)

In the terminal, you can easily see the executed result of the test cases (fail or success)
![](https://i.imgur.com/NuvjxjC.png)

### Code coverage report
There is a `coverage` folder generated
![](https://i.imgur.com/6sVHcqo.png)

Run `index.html` file on Live Server - Visual Studio Code, you will see the statistics of each file and the whole project
![](https://i.imgur.com/8zFLfQ5.png)

Click on a specific file name, you can see which line was executed and which was not (highlighted with red) and how many times each line was run
![](https://i.imgur.com/aMDBI9w.png)

Based on the report, we can say that test cases have covered almost every line. However, there is an untested case: Password cannot have whitespace. In this situation, test cases are good but not perfect. 

## Summary
Above contents shows you how code coverage is used to evaluate if you test cases have covered the source. In addition, it gives you information about the tools that can be combined to work things out. Mocha, chai and karma are very powerful tools to test program.


## References
- https://www.meziantou.net/test-javascript-code-using-karma-mocha-chai-and-headless-browsers.htm
- https://stackoverflow.com/questions/67433311/proper-packaging-in-godoc-and-comments-not-showing-in-godoc (deleted)