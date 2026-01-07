const repl = require("repl");
const os = require("os");

// Start REPL
const r = repl.start({
    prompt: "calc> "
});

// Store numbers
r.context.numbers = [];

// Add number
r.context.add = function (num) {
    this.numbers.push(num);
    console.log("Number added:", num);
};

// Calculate sum
r.context.sum = function () {
    const result = this.numbers.reduce((a, b) => a + b, 0);
    console.log("Sum =", result);
};

// Calculate average
r.context.average = function () {
    const avg = this.numbers.reduce((a, b) => a + b, 0) / this.numbers.length;
    console.log("Average =", avg);
};

// Find maximum
r.context.max = function () {
    const maxVal = Math.max(...this.numbers);
    console.log("Maximum =", maxVal);
};

// Show system info (core module usage)
r.context.info = function () {
    console.log("OS Platform:", os.platform());
    console.log("CPU Cores:", os.cpus().length);
};
