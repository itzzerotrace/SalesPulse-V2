import {
calculateCommission
} from "./calculator";


const result =
calculateCommission({

voiceMrc:3000,

voiceAttainment:true,

upgrades:20,

upgradeAttainment:true,

mim:25,

hsi:20,

hsiAttainment:true,

bts:25,

accessories:3000,

accessoryAttainment:true

});


console.log(result);
