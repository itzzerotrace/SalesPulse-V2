"use client";


import {useState} from "react";

import AssignGoalCard from "@/components/goals/AssignGoalCard";
import GoalSummary from "@/components/goals/GoalSummary";
import TeamGoalOverview from "@/components/goals/TeamGoalOverview";



export default function ManagerGoalsClient(){


const [
employeeId,
setEmployeeId
]=useState("");



return (

<div className="
space-y-8
">


<AssignGoalCard

onEmployeeChange={setEmployeeId}

/>





{employeeId && (

<GoalSummary

employeeId={employeeId}

/>

)}





<TeamGoalOverview/>



</div>

)

}
