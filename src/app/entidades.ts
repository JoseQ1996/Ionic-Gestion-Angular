export class Usuario{
    username:string='';
    password:string='';
    confirmPassword?:string;
}
export interface Componente{
    icon:string;
    name:string;
    redirectTo:string;
}
export class Cliente{
    id?:number;
    tipoIdentificacion:string='';
    identificacionNumero: string='';
    nombre: string='';
    direccion: string='';
    telefono: string='';
    correoElectronico:string='';
}