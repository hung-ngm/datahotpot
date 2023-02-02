import { Dispatch, SetStateAction, FC } from 'react';
import {TC} from "../card/types"

export type TItems = {
    className: string;
    items: Array<TC>;
    cardName: string;
    onCardClick: () => void;
    visibleModal: boolean;
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    modal?: any;
}