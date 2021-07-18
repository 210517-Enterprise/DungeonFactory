export function capitalize(str) {
    if (str.length === 0) {
        return ""
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const apiUrl = process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:8080/api'
