export function calculateAttainment(
actual:number,
goal:number
){

if(goal===0){

return 0;

}


return actual / goal;

}



export function getTier(
attainment:number,
tiers:any[]
){

return tiers.find((tier)=>{

if(tier.max){

return attainment >= tier.min &&
attainment <= tier.max;

}

return attainment >= tier.min;

});

}
