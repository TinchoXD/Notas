import { Catalogo } from "../catalogo/catalogo";

export interface User{

    id: number;
    username: string;
    firstname: string;
    lastname: string;
    role?: string;
    /* mensaje?: string; */
    pais:string;
    estadoCivil: Catalogo;
    
    user_direccion: string;
    user_telefono_celular: string;
    user_telefono_convencional: string;
    user_email_personal: string;
    user_email_institucional: string;
    user_distrito: string;

    user_relacion_laboral: Catalogo;
    user_jornada_laboral: Catalogo;
    user_categoria: Catalogo;
    user_grupo_etnico: Catalogo;
    user_grupo_etnico_otro: Catalogo;


}