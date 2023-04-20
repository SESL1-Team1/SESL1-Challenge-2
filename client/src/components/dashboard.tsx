import React, { useState, useEffect, useMemo} from 'react';
import axios from "axios";
import TaskItem, {Task} from './task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort} from '@fortawesome/free-solid-svg-icons'

//static for styling
const tasks:Task[] = [
    {id:1,title:"task 1",description:"This is task 1",status: "completed", due: new Date()},
    {id:2,title:"task 2",description:"This is task 2",status: "completed", due: new Date()},
    {id:3,title:"task 3",description:"This is task 3",status: "completed", due: new Date()},
    {id:4,title:"task 4",description:"This is task 4",status: "completed", due: new Date()},
]
        

const deleteTask = (id:Number)=>{
    
}

const updateStatus = ()=>{

}


const Dashboard:React.FC = ()=>{
    const [sortOpt,setSortOpt] = useState("Due");
    // useEffect(()=>{

    // });

    const handleSort = (e:any) => {
        setSortOpt(e.target.value);
        console.log(sortOpt);
    }

    return (
        <>
            <header className="bg-purple-600 h-40 p-20">
                <h1 className="self-center text-6xl font-semibold whitespace-nowrap text-white subpixel-antialiased">Task Board</h1>
            </header>
            <div className="grid grid-cols-12 mx-20 mb-5 px-4 pt-4 h-10 font-semibold text-xl">
                <div className="col-span-2">
                    Title
                </div>
                <div className="col-span-4">
                    Description
                </div>
                <div className="col-span-2">
                    Status
                </div>
                <div className="col-span-2">
                    Due Date
                </div>
                <div className="col-span-2">
                    Sort By: {" "}
                    <select className="align-top focus:ring-4 focus:outline-none rounded-lg border-black border-2 text-center py-0 my-auto h-8" value={sortOpt} onChange={handleSort}>
                        <option value="Title">Title</option>
                        <option value="Status" className="block px-4 py-2 hover:bg-gray-100">Status</option>
                        <option value="Due" className="block px-4 py-2 hover:bg-gray-100">Due Date</option>
                    </select>
                </div>
            </div>
            <div className="font-san grid gap-y-6 w-screen mb-8">
                {tasks.map(task => <TaskItem task={task} deleteTask ={()=>deleteTask(task.id)} updateStatus={updateStatus} key={task.id}/>)}
            </div>
        </>
    );
}

export default Dashboard;