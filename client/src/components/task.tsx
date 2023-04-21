import React from "react";
//import "../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

type Task = {
    _id: string,
    title: string;
    description: string,
    status: string,
    dueDate: Date
};
type taskKey = keyof Task;

interface Prop{
    task:Task,
    clickDel:React.MouseEventHandler<HTMLButtonElement>,
    clickUpdate: React.MouseEventHandler<HTMLButtonElement>
}

const TaskItem: React.FC<Prop> = ({task, clickDel, clickUpdate})=>{
    return (
            <div className="bg-white shadow-md rounded grid grid-cols-12 mx-20 px-4 py-4 h-20 font-mono border-2 border-black" id={task._id}>
                <div className="col-span-2 font-semibold truncate mr-2">
                    {task.title}
                </div>
                <div className="col-span-4 truncate">
                    {task.description}
                </div>
                <div className="col-span-2">
                    {task.status}
                </div>
                <div className="col-span-2">
                    {new Date(task.dueDate).toDateString().substring(4,20)}
                </div>
                <div className="col-span-1 pl-7">
                    <button onClick={clickDel}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
                <div className="col-span-1 pl-7">
                    <button onClick={clickUpdate}>
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                </div>
            </div>
    );
}

export {type Task, type taskKey};
export default TaskItem;