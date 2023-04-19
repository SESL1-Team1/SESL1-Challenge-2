import React, { useState, useEffect} from 'react';
import axios from "axios";
import { Task } from './task';
import TaskItem from './task';


const tasks:Task[] = [{id:1,title:"task 1",description:"This is task 1",status: "completed", due: new Date()},
{id:2,title:"task 2",description:"This is task 2",status: "completed", due: new Date()},
{id:3,title:"task 3",description:"This is task 3",status: "completed", due: new Date()},
{id:4,title:"task 4",description:"This is task 4",status: "completed", due: new Date()}]

const Dashboard:React.FC = ()=>{
    return (
        <>
            <header>Task Board</header>
            <div>
                {tasks.map(task => <TaskItem task={task} key={task.id}/>)}
            </div>
        </>
    );
}

export default Dashboard;