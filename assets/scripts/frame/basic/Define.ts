namespace define {
    export type Constructor<T = unknown> = new (...args: any[]) => T;
}

export default define;