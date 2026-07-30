import {
COMMISSION_RULES
} from "./rules";


import {
CommissionInput,
CommissionResult
} from "./types";



export function calculateCommission(

input:CommissionInput

):CommissionResult{


const voice = input.voiceAttainment

?
input.voiceMrc * COMMISSION_RULES.voiceRate

:

0;



const upgrades = input.upgradeAttainment

?
input.upgrades * COMMISSION_RULES.upgradeRate

:

0;



const mim =

input.mim *

COMMISSION_RULES.mimRate;



const hsi = input.hsiAttainment

?
input.hsi * COMMISSION_RULES.hsiRate

:

0;



const bts =

input.bts *

COMMISSION_RULES.btsRate;



const accessories = input.accessoryAttainment

?
input.accessories *
COMMISSION_RULES.accessoryRate

:

0;



return {

voice,

upgrades,

mim,

hsi,

bts,

accessories,

total:

voice +
upgrades +
mim +
hsi +
bts +
accessories

};


}
