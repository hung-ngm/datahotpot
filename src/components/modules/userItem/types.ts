export type TUser = {
    className: string,
    items: Array<TU>
}

export type TU = {
    name: string,
    position: string,
    avatar: string,
    reward?: string
}