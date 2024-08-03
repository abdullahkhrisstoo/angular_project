import { CardInfoDTO } from "./card-info-dto";

export interface RegisterExamProviderDTO {
    createAccountViewModel: CreateAccountViewModel;
    cardInfoDTO: CardInfoDTO;
    planId: number;

}

export interface CreateAccountViewModel {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phonenum?: string;
    password?: string;
    roleId?: number;

}


