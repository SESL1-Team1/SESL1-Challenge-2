import React from "react";
// import "../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

type Task = {
    _id: number,
    title: string;
    description: string,
    status: string,
    dueDate: Date
};

interface Prop{
    task:Task,
    deleteTask: React.MouseEventHandler<HTMLButtonElement>,
    updateStatus: React.MouseEventHandler<HTMLButtonElement>,
}

const TaskItem: React.FC<Prop> = ({task, deleteTask, updateStatus})=>{
    return (
            <div className="bg-orange-200 shadow-md rounded grid grid-cols-12 mx-20 px-4 py-4 h-20">
                <div className="col-span-2 font-semibold text-ellipsis">
                    {task.title}
                </div>
                <div className="col-span-4 text-ellipsis">
                    {task.description}
                </div>
                <div className="col-span-2">
                    {task.status}
                </div>
                <div className="col-span-2">
                    {new Date(task.dueDate).toDateString().substring(4,20)}
                </div>
                <div className="col-span-1 pl-7">
                    <button onClick={deleteTask}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
                <div className="col-span-1 pl-7">
                    <button onClick={updateStatus}>
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                </div>
            </div>
    );
}

export {type Task};
export default TaskItem;