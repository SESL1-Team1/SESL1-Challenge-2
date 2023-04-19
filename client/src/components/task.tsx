import React from "react";
import { DataRouteObject } from "react-router-dom";
import "../index.css";

type Task = {
    id: number,
    title: string;
    description: string,
    status: string,
    due: Date
};

interface Prop{
    task:Task
}

const TaskItem: React.FC<Prop> = ({task})=>{
    
    return (
        <div className="max-w-md w-full lg:flex">

        </div>

    );
}

export {type Task};
export default TaskItem;