export interface IUserCreateDto {
    firstName:string;
    lastName:string;
    email:string;
    password: string;
}

export interface IUserUpdateDto {
    age?:number;
    password?: string;
}

export interface IUserLoginDto {
    email:string;
    password: string;
}

export interface IUserTokensDto {
    accessToken:string;
    refreshToken: string;
}