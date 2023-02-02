import { Dispatch, SetStateAction, FC } from 'react';
import { TNFTItem } from '../../../../types/NFTItem';

export type TItems = {
    className: string;
    items: Array<TNFTItem>;
    cardName: string;
    isBuy: boolean;
}