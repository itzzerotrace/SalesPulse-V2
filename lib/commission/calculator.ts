

export interface CommissionInput{

mrc:number;

}



export function calculateMrcCommission(

input:CommissionInput

){


return input.mrc * 0.10;


}
