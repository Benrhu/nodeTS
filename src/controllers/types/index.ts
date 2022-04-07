/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
    message: string
}

export type DateResponse = {
    date: Date
}

export type ErrorResponse = {
    error: string,
    message: string
}
