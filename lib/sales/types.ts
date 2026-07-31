
export type SaleType =

"New Voice" |
"New MiM" |
"Upgrade" |
"New HSI" |
"New BTS";



export interface SaleItem{


phone:string;

type:SaleType;


}



export interface Sale{


customerName:string;

customerPhone:string;

ban:string;

estimatedMrc:number;

grossProfit:number;

accessories:number;

items:SaleItem[];

notes:string;


}
