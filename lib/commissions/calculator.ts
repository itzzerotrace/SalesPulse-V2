import {
calculateAttainment,
getTier
} from "./attainment";


import {
VOICE_TIERS,
LINE_TIERS,
UPGRADE_TIERS,
ACCESSORY_TIERS
} from "./tiers";


import {
GoalInput,
SalesInput,
CommissionResult
} from "./types";



export function calculateCommission(

goals:GoalInput,

sales:SalesInput

):CommissionResult{


const voiceAttainment =
calculateAttainment(
sales.voiceCount,
goals.voiceGoal
);


const voiceTier =
getTier(
voiceAttainment,
VOICE_TIERS
);



const upgradeAttainment =
calculateAttainment(
sales.upgradeCount,
goals.upgradeGoal
);


const upgradeTier =
getTier(
upgradeAttainment,
UPGRADE_TIERS
);



const hsiAttainment =
calculateAttainment(
sales.hsiCount,
goals.hsiGoal
);


const hsiTier =
getTier(
hsiAttainment,
LINE_TIERS
);



const mimAttainment =
calculateAttainment(
sales.mimCount,
goals.mimGoal
);


const mimTier =
getTier(
mimAttainment,
LINE_TIERS
);



const btsAttainment =
calculateAttainment(
sales.btsCount,
goals.btsGoal
);


const btsTier =
getTier(
btsAttainment,
LINE_TIERS
);



const accessoryAttainment =
calculateAttainment(
sales.accessoryRevenue,
goals.accessoryGoal
);


const accessoryTier =
getTier(
accessoryAttainment,
ACCESSORY_TIERS
);



const result={


voice:{

attainment:voiceAttainment,

tier:voiceTier.name,

commission:
sales.voiceMrc *
voiceTier.rate

},


upgrades:{

attainment:upgradeAttainment,

tier:upgradeTier.name,

commission:
sales.upgradeCount *
upgradeTier.rate

},


hsi:{

attainment:hsiAttainment,

tier:hsiTier.name,

commission:
sales.hsiCount *
hsiTier.rate

},


mim:{

attainment:mimAttainment,

tier:mimTier.name,

commission:
sales.mimCount *
mimTier.rate

},


bts:{

attainment:btsAttainment,

tier:btsTier.name,

commission:
sales.btsCount *
btsTier.rate

},


accessories:{

attainment:accessoryAttainment,

tier:accessoryTier.name,

commission:
sales.accessoryRevenue *
accessoryTier.rate

}


};


return {

...result,

total:

result.voice.commission +

result.upgrades.commission +

result.hsi.commission +

result.mim.commission +

result.bts.commission +

result.accessories.commission

};


}
