/* Simple logger utility to make logging consistent and more readable */
export class Logger {
    private static colors = {
        LOG: ' \x1b[37m',
        INFO: ' \x1b[36m',
        WARN: ' \x1b[33m',
        ERROR: ' \x1b[31m',
        DEBUG: ' \x1b[35m',
        RESET: ' \x1b[0m',
    };

    private static format(level: keyof typeof Logger.colors, message: string, ...args: any[]) {
        const color = Logger.colors[level];
        const timestamp = new Date().toISOString();
        const tag = `${color}[${level}]${Logger.colors.RESET}`;
        console.log(`${tag} ${timestamp} - ${message}`, ...args);
    }

    static log(message: string, ...args: any[]) {
        this.format('LOG', message, ...args);
    }

    static info(message: string, ...args: any[]) {
        this.format('INFO', message, ...args);
    }

    static warn(message: string, ...args: any[]) {
        this.format('WARN', message, ...args);
    }

    static error(message: string, ...args: any[]) {
        const color = Logger.colors.ERROR;
        const reset = Logger.colors.RESET;
        const timestamp = new Date().toISOString();
        console.error(`${color}[ERROR]${reset} ${timestamp} - ${message}`, ...args);
    }

    static debug(message: string, ...args: any[]) {
        this.format('DEBUG', message, ...args);
    }
}