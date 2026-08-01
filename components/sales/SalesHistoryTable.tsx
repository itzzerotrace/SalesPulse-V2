export default function SalesHistoryTable(){

return (

<div className="
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
overflow-hidden
">


{/* Desktop Table */}

<div className="
hidden
md:block
overflow-x-auto
">


<table className="w-full">


<thead className="
bg-slate-100
text-slate-900
">


<tr>

<th className="
p-5
text-left
font-black
">

Date

</th>


<th className="
p-5
text-left
font-black
">

Type

</th>


<th className="
p-5
text-left
font-black
">

Value

</th>


</tr>


</thead>



<tbody>


<tr className="
border-t
border-slate-200
">


<td className="
p-5
font-semibold
text-slate-900
">

--

</td>


<td className="
p-5
font-semibold
text-slate-900
">

Sale

</td>


<td className="
p-5
font-semibold
text-slate-900
">

--

</td>


</tr>


</tbody>


</table>


</div>





{/* Mobile Cards */}

<div className="
md:hidden
p-4
space-y-4
">


<div className="
rounded-2xl
bg-slate-100
p-5
">


<div className="
flex
justify-between
items-center
">


<h3 className="
font-black
text-slate-900
">

Sale

</h3>


<span className="
text-sm
font-bold
text-slate-700
">

--

</span>


</div>



<div className="
mt-4
space-y-2
">


<p className="
font-semibold
text-slate-900
">

Date:

<span className="
font-normal
">

--

</span>

</p>



<p className="
font-semibold
text-slate-900
">

Value:

<span className="
font-normal
">

--

</span>

</p>


</div>


</div>


</div>


</div>

)

}
