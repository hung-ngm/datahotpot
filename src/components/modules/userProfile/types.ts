import { TUser } from "../../../../types/user"

export type TUP = {
    className: string,
    item: Array<Social>,
    user: TUser
}

export type Social = {
    title: string,
    url: string
}