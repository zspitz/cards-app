export const hasIntersection = <T>(arr1: T[], arr2: T[]) => arr1.some(x1 => arr2.includes(x1))

// https://stackoverflow.com/a/32108184/111794
export const isEmptyObject = (o: NonNullable<object>) => {
    for (const _key in o) {
        return false
    }
    return true
}
