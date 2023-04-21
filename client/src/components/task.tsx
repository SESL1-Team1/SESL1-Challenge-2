import React from "react";
//import "../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

type Task = {
    _id: string,
    title: string;
    description: string,
    status: string,
    due: Date
};
type taskKey = keyof Task;

interface Prop{
    task:Task,
    clickDel:React.MouseEventHandler<HTMLButtonElement>,
    clickUpdate: React.MouseEventHandler<HTMLButtonElement>
}

const TaskItem: React.FC<Prop> = ({task, clickDel, clickUpdate})=>{
    return (
            <div className="bg-orange-200 shadow-md rounded grid grid-cols-12 mx-20 px-4 py-4 h-20" id={task._id}>
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
                    {task.due.toDateString().substring(4,10)}
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