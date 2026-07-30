import {getSales} from "./sales";
import {getGoals} from "./goals";


export async function getDashboardData(){

const sales = await getSales();

const goals = await getGoals();


return {

sales,

goals

};

}
