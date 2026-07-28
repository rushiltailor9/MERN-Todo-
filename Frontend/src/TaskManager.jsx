// import React from 'react'
import { useCallback, useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa6";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { createTask, deleteTasksById, getAllTasks, UpdateTasksById } from './api.js';
import { notify } from './utils';

const TaskManager = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask,setUpdateTask] = useState(null);

  const handleTask = () =>{
    if(updateTask && input){
      //Update api call
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id
      }
      handleUpdateItem(obj);
    }else if(updateTask === null && input){
      //Create api call
      handleAddTask();
    }
    setInput('');
  } 


  /*************Craete a task*************/
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false
    }
    try {
      const {success, message} = await createTask(obj);
      if(success){
        notify(message,'success');
      }else{
        notify(message,'error')
      }
      setInput('');
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify('Failed To create tasks...');
    }
  }

  /************Dispaly the Task***********/
  const fetchAllTask = useCallback(async() =>{
    try {
      const {data} = await getAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (err) {
      console.error(err);
      notify('Failed To create tasks...');
    }
  },[]);
  useEffect(()=>{
    fetchAllTask()
  },[fetchAllTask])

  /************Delete The Task************/
  const handleDeleteTask = async(id) =>{
    try {
      const {success, message} = await deleteTasksById(id);
      if(success){
        notify(message,'success');
      }else{
        notify(message,'error')
      }
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify('Failed To create tasks...');
    }
  }
  /***********Handle The Check and Uncheck************/
  const handleCheckAndUncheck = async(item) =>{
    const {_id, isDone, taskName} = item;
    const obj = {
        taskName,
        isDone:!isDone
    }
    try {
      const {success, message} = await UpdateTasksById(_id,obj);
      if(success){
        notify(message,'success');
      }else{
        notify(message,'error')
      }
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify('Failed To create tasks...');
    }
  }

  /*************Update The Task**************/
  const handleUpdateItem = async(item) =>{
    const {_id, isDone, taskName} = item;
    const obj = {
        taskName,
        isDone:isDone
    }
    try {
      const {success, message} = await UpdateTasksById(_id,obj);
      if(success){
        notify(message,'success');
      }else{
        notify(message,'error')
      }
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify('Failed To create tasks...');
    }
  }

  /*************Search Section***************/
  const handleSearch = (e) =>{
    const term = e.target.value.toLowerCase();
    const oldTask = [...copyTasks];
    const result = oldTask.filter((item)=>item.taskName.toLowerCase().includes(term));
    setTasks(result);
  }
  return (
    /****************Add Input and Button***************/
    <div className='container'>
      <h1>TaskManager</h1>
      <div className='controls-row'>
        <div className='add-task'>
          <input type="text" placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button className='addButton' title="Add Task" onClick={handleTask}>
            <FaPlus />
          </button>
        </div>

        {/*****************Search The Tasks ******************/}
        <div className='search-input'>
          <span>
            <FaSearch />
          </span>
          <input onChange={handleSearch} type="text" placeholder="Search tasks..." />
        </div>
      </div>
      
      {/*****************List Of A Tasks***********************/}
      <div className='task-list'>
          {
              tasks.map((item)=>(
                  <div key={item._id} className='task-item'>
                      <span className={item.isDone ? 'text-decoration-line-through' : ''}>{item.taskName}</span>
                      <div className='task-buttons'>
                          <button onClick={()=>handleCheckAndUncheck(item)}><FaCheck /></button>
                          <button onClick={()=>{ setUpdateTask(item); setInput(item.taskName); }}><MdModeEdit /></button>
                          <button onClick={()=>handleDeleteTask(item._id)}><MdDelete /></button>
                      </div>
                  </div>
              ))
          }
      </div>

      {/****************ToastMassage**************************/}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  )
}

export default TaskManager
