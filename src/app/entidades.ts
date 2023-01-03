export class Usuario{
    id?:number;
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
export class Producto{
    id?:number;
    descripcion: string='';
    precioUnitario: number=0.00;
    usuarioId:number=0;
}