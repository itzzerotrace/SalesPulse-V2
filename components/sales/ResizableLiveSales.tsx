"use client";

import {Rnd} from "react-rnd";
import RecentSales from "./RecentSales";


export default function ResizableLiveSales(){


return (

<Rnd

default={{
x:40,
y:40,
width:380,
height:560
}}


minWidth={300}

minHeight={300}


bounds="window"


dragHandleClassName="drag-handle"


enableResizing={{

top:false,

right:true,

bottom:true,

left:false,

bottomRight:true

}}


resizeHandleStyles={{

bottomRight:{

width:"25px",

height:"25px",

right:"0",

bottom:"0",

zIndex:99999,

cursor:"nwse-resize"

}

}}


style={{

zIndex:9999

}}


>


<div

style={{

width:"100%",

height:"100%"

}}

>


<RecentSales/>


</div>


</Rnd>

)

}
