import { Catalogo } from "../catalogo/catalogo";

export interface User{

    id: number;
    username: string;
    firstname: string;
    lastname: string;
    role?: string;
    /* mensaje?: string; */
    pais:string;
    estadoCivil: number;
    
    user_direccion: string;
    user_telefono_celular: string;
    user_telefono_convencional: string;
    user_email_personal: string;
    user_email_institucional: string;
    user_distrito: string;

    user_relacion_laboral: number;
    user_jornada_laboral: number;
    user_categoria: number;
    user_grupo_etnico: number;
    user_grupo_etnico_otro: number;
    user_nivel_educacion: number;
    user_fecha_nacimiento: Date;
    user_titulo_senescyt: string;
    user_especialidad_accion_personal: string;

    user_estado_usuario: boolean
    
    


}