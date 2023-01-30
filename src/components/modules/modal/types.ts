import React from "react"

export type TModal = {
    outerClassName?: string,
    containerClassName?: string,
    visible: boolean,
    onClose: () => void,
    children?: React.ReactNode
}