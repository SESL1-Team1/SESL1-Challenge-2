import React, { useState, useEffect, useMemo} from 'react';
import axios from "axios";
import TaskItem, {Task} from './task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort} from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.css';


const updateStatus = ()=>{

}


const Dashboard:React.FC = () =>{
    const [sortOpt,setSortOpt] = useState("Due");
    // TODO: fix sorting, uses previous state, needs to be in useEffect?
    // useEffect(()=>{

    // });
    const [tasks, setTasks] = useState<Task[]>([]);
    const [pageNumber, setPageNumber] = useState(0);

    const tasksPerPage = 5;
    const pagesVisited = pageNumber * tasksPerPage;
    const pageCount = Math.ceil(tasks.length / tasksPerPage);
    const displayTasks = tasks.slice(pagesVisited, pagesVisited + tasksPerPage);

    // TODO: have tasks update properly when changed in useEffect - currently when used in useEffect it runs every second
    const fetchTasks = async () => {
        const res = await axios.get("http://localhost:5000/tasks");
        setTasks(res.data.tasks);
    }

    useEffect(() => {
        fetchTasks();
    }, [])

    const deleteTask = async (id: number) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    }

    const sortTasks = (tasks:Task[]) => {
        if (sortOpt === "Title") {
            tasks = tasks.sort((a, b) => (a.title > b.title) ? 1 : -1);
        } else if (sortOpt === "Status") {
            tasks = tasks.sort((a, b) => (a.status > b.status) ? 1 : -1);
        } else if (sortOpt === "Due") {
            tasks = tasks.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
        }
    }

    const handleSort = (e:any) => {
        setSortOpt(e.target.value);
        sortTasks(tasks);
        console.log(sortOpt);
    }

    const handlePageChange = ({ selected: selectedPage }: { selected: number } ) => {
        setPageNumber(selectedPage);
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
                {displayTasks.map(task => <TaskItem task={task} deleteTask ={()=>deleteTask(task._id)} updateStatus={updateStatus} key={task._id}/>)}
            </div>
            <div className="flex justify-center">
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </>
    );
}

export default Dashboard;
