import { TNFTItem } from "../../../../types/NFTItem";
import { TUser } from "../../../../types/user";

export interface IProfile {
    myDataNFTs? : TNFTItem[];
    user: TUser;
}