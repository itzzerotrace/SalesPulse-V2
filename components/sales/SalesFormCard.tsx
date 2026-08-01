"use client";

import {useState} from "react";
import {createSale} from "@/lib/services/createSale";


type SaleType =
"New Voice" |
"New MiM" |
"Upgrade" |
"New HSI" |
"New BTS";


interface SaleItem{
phone:string;
type:SaleType;
}



export default function SalesFormCard(){

const [customerName,setCustomerName]=useState("");
const [customerPhone,setCustomerPhone]=useState("");
const [ban,setBan]=useState("");

const [mrc,setMrc]=useState("");
const [gp,setGp]=useState("");
const [accessories,setAccessories]=useState("");

const [notes,setNotes]=useState("");

const [saving,setSaving]=useState(false);


const [items,setItems]=useState<SaleItem[]>([
{
phone:"",
type:"New Voice"
}
]);



function addItem(){

setItems([
...items,
{
phone:"",
type:"New Voice"
}
]);

}



function updateItem(
index:number,
field:keyof SaleItem,
value:string
){

const updated=[...items];

updated[index]={
...updated[index],
[field]:value
};

setItems(updated);

}



function categoryTotals(){

return {

voice:items.filter(x=>x.type==="New Voice").length,

mim:items.filter(x=>x.type==="New MiM").length,

upgrade:items.filter(x=>x.type==="Upgrade").length,

hsi:items.filter(x=>x.type==="New HSI").length,

bts:items.filter(x=>x.type==="New BTS").length

};

}



function commissionPreview(){

return Number(mrc || 0) * .10;

}



async function saveSale(){

try{

setSaving(true);

const totals=categoryTotals();


await createSale({

customerName,

customerPhone,

ban,

notes,

mrc,

gp,

accessories,

...totals

});


alert("Sale saved successfully");


setCustomerName("");
setCustomerPhone("");
setBan("");
setMrc("");
setGp("");
setAccessories("");
setNotes("");

setItems([
{
phone:"",
type:"New Voice"
}
]);

}

catch(error:any){

console.error(error);

alert(error?.message || "Failed to save sale");

}

finally{

setSaving(false);

}

}




return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
p-5
sm:p-8
shadow-sm
">


<h2 className="
text-2xl
font-black
text-slate-900
">

Enter Sale

</h2>


<p className="
mt-2
font-medium
text-slate-600
">

Create a customer transaction.

</p>



<h3 className="
mt-8
text-lg
font-black
text-slate-900
">

Customer Information

</h3>



<div className="
mt-4
grid
gap-4
md:grid-cols-2
">


<input
className="w-full rounded-xl border border-slate-300 p-4 text-slate-900"
placeholder="Customer Name"
value={customerName}
onChange={(e)=>setCustomerName(e.target.value)}
/>


<input
className="w-full rounded-xl border border-slate-300 p-4 text-slate-900"
placeholder="Customer Phone"
value={customerPhone}
onChange={(e)=>setCustomerPhone(e.target.value)}
/>


<input
className="w-full rounded-xl border border-slate-300 p-4 text-slate-900"
placeholder="Customer BAN"
value={ban}
onChange={(e)=>setBan(e.target.value)}
/>


<input
className="w-full rounded-xl border border-slate-300 p-4 text-slate-900"
placeholder="Estimated MRC"
value={mrc}
onChange={(e)=>setMrc(e.target.value)}
/>


</div>




<h3 className="
mt-8
text-lg
font-black
text-slate-900
">

Sales Lines

</h3>



<button
onClick={addItem}
className="
mt-4
w-full
rounded-xl
bg-purple-600
py-3
font-black
text-white
sm:w-auto
sm:px-6
"
>

+ Add Line

</button>





<div className="mt-5 space-y-4">


{items.map((item,index)=>(


<div
key={index}
className="
rounded-2xl
border
border-slate-200
p-4
"
>


<input

className="
w-full
rounded-xl
border
border-slate-300
p-4
text-slate-900
"

placeholder="Phone Number"

value={item.phone}

onChange={(e)=>
updateItem(
index,
"phone",
e.target.value
)
}

/>



<div className="
mt-4
grid
grid-cols-2
gap-3
sm:grid-cols-5
">


{[
"New Voice",
"New MiM",
"Upgrade",
"New HSI",
"New BTS"
].map(type=>(


<button

key={type}

onClick={()=>
updateItem(
index,
"type",
type
)
}

className={`rounded-xl border p-3 text-sm font-black ${
item.type===type
?
"bg-purple-600 text-white"
:
"bg-white text-slate-900"
}`}

>

{type}

</button>


))}


</div>


</div>


))}


</div>






<h3 className="
mt-8
text-lg
font-black
text-slate-900
">

Financial Details

</h3>



<div className="
mt-4
grid
gap-4
md:grid-cols-2
">


<input
className="rounded-xl border border-slate-300 p-4 text-slate-900"
placeholder="Gross Profit"
value={gp}
onChange={(e)=>setGp(e.target.value)}
/>


<input
className="rounded-xl border border-slate-300 p-4 text-slate-900"
placeholder="Accessories Revenue"
value={accessories}
onChange={(e)=>setAccessories(e.target.value)}
/>


</div>





<div className="
mt-5
rounded-xl
bg-purple-50
p-5
">


<p className="font-bold text-slate-900">

Estimated Commission

</p>


<p className="
text-3xl
font-black
text-purple-700
">

${commissionPreview().toFixed(2)}

</p>


</div>





<textarea

className="
mt-5
w-full
rounded-xl
border
border-slate-300
p-4
text-slate-900
"

placeholder="Notes"

value={notes}

onChange={(e)=>setNotes(e.target.value)}

/>





<button

onClick={saveSale}

disabled={saving}

className="
mt-6
w-full
rounded-2xl
bg-gradient-to-r
from-purple-600
to-indigo-600
py-4
font-black
text-white
"

>

{saving ? "Saving..." : "Save Sale"}

</button>



</div>

)

}
