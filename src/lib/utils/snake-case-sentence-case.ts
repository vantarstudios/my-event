export const upperSnakeCaseToSentenceCase = (str: string) => {
    return str
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

export const sentenceCaseToUpperSnakeCase = (str: string) => {
    return str
        .split(' ')
        .map((word) => word.toUpperCase())
        .join('_')
}
