
export interface CommissionSummary{


mrcCommission:number;

totalCommission:number;


}


export function calculateCommissionSummary(

mrc:number

):CommissionSummary{


const mrcCommission=mrc * .10;


return {

mrcCommission,

totalCommission:mrcCommission

};


}
