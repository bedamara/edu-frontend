/** Значения объекта */
declare type ValueOf<T> = T[keyof T];

/** Значения массива */
declare type ValuesOf<T extends Array<unknown>> = T[number];

declare type AsyncReturnType<T extends (..._args: any) => Promise<any>> =
    Awaited<ReturnType<T>>;
