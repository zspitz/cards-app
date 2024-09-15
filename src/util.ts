export const hasIntersection = <T>(arr1: T[], arr2: T[]) => arr1.some(x1 => arr2.includes(x1))

// https://stackoverflow.com/a/32108184/111794
export const isEmptyObject = (o: NonNullable<object>) => {
    for (const _key in o) {
        return false
    }
    return true
}

// headers can be a number of different kinds of objects: arrays, key-value objects, other
// this function returns an array of 2-string-tuples, of key-value pairs
export const parseHeaders = (headers: HeadersInit) => {
    const entries =
        headers instanceof Headers || Array.isArray(headers) ?
            Array.from(headers) :
            Object.entries(headers)
    return entries.map(([name, value]) => [name.toLowerCase(), value.toLowerCase()] as const)
}

// https://stackoverflow.com/a/12646864/111794
export const shuffleArray = <T>(array: T[]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1)
        )
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
