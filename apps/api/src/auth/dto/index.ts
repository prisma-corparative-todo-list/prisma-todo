



export class SignupDto {
    email:string;
    userName:string;
    firstName:string;
    lastName:string;
    password:string
}

export class SigninDto {
    login:string;
    password:string
}


export class Tokens {
    refreshToken:string;
    accessToken:string;
}