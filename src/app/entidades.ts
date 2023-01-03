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
export class Detalle{
    cantidad : number=0;
    precioUnitario:number=0.00;
    total :number=0.00;
    servicioId?:number;
}
export class Factura{
    fechaDeEmision: Date=new Date();   
    subtotal :number=0.00;
    impuesto : number=0.00;
    total : number=0.00;   
    clienteId : number=0;
    usuarioId : number=0;    
    detalles: Detalle[]=[];
        
}