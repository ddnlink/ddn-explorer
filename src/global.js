//同一控制是否在控制台打印
const log = console.log;
console.log = (...args) => {
    if (true) {
        args = args.map(arg => arg);
        log.apply(console, args);
    }
}