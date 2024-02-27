export function isImplementsType<T>(data: any): data is T {
    return !!(data as T);

}