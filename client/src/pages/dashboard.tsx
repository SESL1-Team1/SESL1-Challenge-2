import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from "axios";
import TaskItem, {Task, taskKey} from '../components/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faCalendarDays, faCircleExclamation, faListCheck} from '@fortawesome/free-solid-svg-icons';
import Datepicker from "tailwind-datepicker-react";
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.css';
import '../dashboard.css';

//static for styling
let test_tasks:Task[] = [
    {_id:"1",title:"task 2",description:"Task 1",status: "not started", dueDate: new Date(new Date().setDate(15))},
    {_id:"2",title:"task 1",description:"Not task 2",status: "in progress", dueDate: new Date((new Date().setDate(1)))},
    {_id:"3",title:"task 4",description:"? task 3",status: "completed", dueDate: new Date()},
    {_id:"4",title:"task 1",description:"Ahh this is task 4",status: "completed", dueDate: new Date(new Date().setDate(8))},
]

//backend-url
const url = "http://localhost:5000" 
//user token
const jwtToken = localStorage.getItem("user_token");


const Dashboard:React.FC = ()=>{
    //dynamically updated tasks
    const [static_tasks,setData] = useState<Task[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    useEffect(()=>{
       // fetch data into static_tasks
       const fetchTasks = async () => {
        const res = await axios.get("http://localhost:5000/tasks",
        {headers: {Authorization: `Bearer ${jwtToken}`}});
        setData(res.data.tasks);
       };
       fetchTasks();
       setRefreshData(false);
    }, [refreshData]);

    const [sortOpt,setSortOpt] = useState("due");

    const handleSort = (e:any) => {
        setSortOpt(e.target.value);
    }

    const [pageNumber, setPageNumber] = useState(0);

    const tasksPerPage = 5;
    const pagesVisited = pageNumber * tasksPerPage;
    const pageCount = Math.ceil(static_tasks.length / tasksPerPage);
    const displayTasks = static_tasks.slice(pagesVisited, pagesVisited + tasksPerPage);

    const handlePageChange = ({ selected: selectedPage }: { selected: number } ) => {
        setPageNumber(selectedPage);
    }

     //no re-rendering at sorting to boost performance
    const tasks = useMemo(()=>{
        static_tasks.sort(
            function (object1:Task, object2:Task) {
                let value1 = object1[sortOpt as taskKey];
                let value2 = object2[sortOpt as taskKey];
                if (typeof(value1)==="string" && typeof(value2)==="string" ){
                    return sortOpt === "status" ? value2.localeCompare(value1) : value1.localeCompare(value2);
                }else{//date
                    if (value1 == value2)
                        return 0;
                    return value2 <  value1 ? 1 : -1;
                }
                }   
            )
            return static_tasks;
    }, [static_tasks,sortOpt])


    //Add Task Modal
    const [isModalOpen,setModalOpen] = useState<boolean>(false);
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }


    const [inputs, setInputs] = useState<{title:string,description:string}>({title:"",description:""});
    const handleInputs = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        //add new task
        await axios.post(
            // `${url}/tasks`, url for production
            `http://localhost:5000/tasks`,
            {
                title: inputs.title,
                description: inputs.description,
                status: "Not Started",
                dueDate: selectedDate
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        //close the modal
        toggleModal();
        setRefreshData(true);
    }


    //Datepicker Properties
    const [show, setShow] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const handleChange = (selectedDate: Date) => {
        setSelectedDate(selectedDate);
        //console.log(selectedDate)
    }
    const handleClose = (state: boolean) => {
        setShow(state);
    }

    const [taskOnAct,setTaskOnAct] = useState("");
    //Delete task
    const [isDelModalOpen,setDelModalOpen] = useState<boolean>(false);
    const toggleDelModal = (id:string) => {
        setTaskOnAct(id);
        setDelModalOpen(true);
    }

    const deleteTask = async ()=>{
        setDelModalOpen(false);
        await axios.delete(
            // `${url}/:${taskOnAct}`, url for production
            `http://localhost:5000/tasks/${taskOnAct}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
            }
        );
        setTaskOnAct("");
        setRefreshData(true);
    }

    //Update task status
    const [isUpdateModalOpen,setUpdateModalOpen] = useState<boolean>(false);
    const toggleUpdateModal = (id:string) => {
        setTaskOnAct(id);
        setUpdateModalOpen(true);
    }

    const updateTask = async (new_status:string)=>{
        setUpdateModalOpen(false);
        //update req
        await axios.put(
            // `${url}/:${string}`, url for production
            `http://localhost:5000/tasks/${taskOnAct}`,
            {
                status: new_status
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            },

        ).then((res)=>{console.log(res.data)});
        setTaskOnAct("");
        setRefreshData(true);
    }

    return (
        <>
            <header className="h-32 px-20 py-10 grid grid-cols-12 font-serif">
                <div className="self-center text-6xl font-semibold whitespace-nowrap text-black subpixel-antialiased col-span-11">Task Board</div>
                <div className="col-span-1 w-full">
                    <button className="font-semibold whitespace-nowrap text-purple-800 text-5xl mb-2" onClick={toggleModal}><FontAwesomeIcon icon={faPlus} size="xl" /></button>
                    {isModalOpen ? 
                    <div id="add-modal" tabIndex={-1} className="fixed z-50 w-7/12 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-10rem)] max-h-full m-[calc(20%)] mt-40">
                        <div className="relative bg-white rounded-lg shadow-lg border-2">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md p-1.5 ml-auto mt-6 mr-6 inline-flex items-center" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faXmark}/>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-10 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900">Add a New Task</h3>
                                <form className="space-y-6" action="#">
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                        <input type="title" name="title" value={inputs.title||""} onChange={handleInputs} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Task Title" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input type="description" name="description" value={inputs.description||""} onChange={handleInputs} placeholder="Brief introduction of the task" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="due" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                                        <div className="relative w-2/5">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <FontAwesomeIcon icon={faCalendarDays} />
                                            </div>
                                            <Datepicker onChange={handleChange} show={show} setShow={handleClose} classNames="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-0"/>
                                        </div>
                                        <button type="submit" onClick={handleSubmit} className="w-4/5 text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-10 mx-20 text-center">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> :null}
                </div>
            </header>
            <div className="grid grid-cols-12 mx-20 mb-4 px-4 pt-4 h-10 font-semibold text-xl">
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
                    <select className="focus:ring-4 focus:outline-none rounded-lg border-black border-2 text-center py-0 my-auto h-8" value={sortOpt} onChange={handleSort}>
                        <option value="title">Title</option>
                        <option value="status" className="block px-4 py-2 hover:bg-gray-100">Status</option>
                        <option value="due" className="block px-4 py-2 hover:bg-gray-100">Due Date</option>
                    </select>
                </div>
            </div>
            <div className="grid gap-y-6 w-screen mb-8">
                {/* Delete Modal */}
                {isDelModalOpen ?
                     <div tabIndex={-1} className="fixed top-0 z-50 p-0 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(30%)] mt-[calc(20%)] mx-[calc(30%)] font-serif">
                        <div className="relative max-h-full">
                            <div className="relative bg-white rounded-lg shadow-xl">
                                <button type="button" onClick={()=>setDelModalOpen(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                    <FontAwesomeIcon icon={faXmark}/>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <FontAwesomeIcon icon={faCircleExclamation} className="text-5xl"/>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this task?</h3>
                                    <button onClick={deleteTask} className="text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                    <button onClick={()=>setDelModalOpen(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">No, cancel</button>
                                </div>
                            </div>
                        </div>
                     </div>
                :null}
                {/* Update Modal */}
                {isUpdateModalOpen ? 
                    <div tabIndex={-1} className="fixed top-0 z-50 p-0 h-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(30%)] mt-[calc(20%)] mx-[calc(30%)] font-serif">
                        <div className="relative max-h-full">
                            <div className="relative bg-white rounded-lg shadow-xl">
                                <button type="button" onClick={()=>setUpdateModalOpen(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                    <FontAwesomeIcon icon={faXmark}/>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <FontAwesomeIcon icon={faListCheck} beat className="text-5xl"/>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Select a new status for this task</h3>
                                    <button onClick={()=>updateTask("Completed")} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-0.5 mr-2 mb-2">
                                        Completed
                                    </button>
                                    <button onClick={()=>updateTask("In Progress")} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                        In Progress
                                    </button>
                                    <button onClick={()=>updateTask("Not Started")} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-0.5 mb-2">
                                        Not Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                :null}
                {displayTasks.map(task => <TaskItem task={task} clickDel={()=>{toggleDelModal(task._id)}} clickUpdate={()=>toggleUpdateModal(task._id)} key={task._id}/>)}
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
