import { Catalogo } from "../catalogo/catalogo";

export interface User{

    id: number;
    username: string;
    firstname: string;
    lastname: string;
    role?: string;
    mensaje?: string;
    pais:string;
    estadoCivil: Catalogo;

}