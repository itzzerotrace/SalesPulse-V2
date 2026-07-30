export interface GoalInput {

voiceGoal:number;

upgradeGoal:number;

hsiGoal:number;

mimGoal:number;

btsGoal:number;

accessoryGoal:number;

}



export interface SalesInput {

voiceMrc:number;

voiceCount:number;

upgradeCount:number;

hsiCount:number;

mimCount:number;

btsCount:number;

accessoryRevenue:number;

}



export interface CommissionResult {

voice:{
attainment:number;
tier:string;
commission:number;
};

upgrades:{
attainment:number;
tier:string;
commission:number;
};

hsi:{
attainment:number;
tier:string;
commission:number;
};

mim:{
attainment:number;
tier:string;
commission:number;
};

bts:{
attainment:number;
tier:string;
commission:number;
};

accessories:{
attainment:number;
tier:string;
commission:number;
};


total:number;

}
