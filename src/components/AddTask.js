
import { useState } from "react";


const AddTask = ({onAdd}) => {

    const [title,setTitle] = useState('')
    const [dueDate,setdueDate] = useState('')
    const [status,setStatus] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        if(!title){
            alert('Please Add Task')
            return
        }

        onAdd ({ title,dueDate,status})

        setTitle('')
        setdueDate('')
        setStatus('')
    }

    return (
        <form className="add-form" onSubmit = {onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type="text" placeholder='Add Task' value= {title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Due Date</label>
            <input type="text" placeholder='Add Due Date' value= {dueDate} onChange={(e) => setdueDate(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Set status</label>
           <input type="text" placeholder='Add Status' value= {status} onChange={(e) => setStatus(e.target.value)} />
        </div>

        <input type='submit' value = 'Save Task' className = 'btn btn-block'/>
        </form>
    );
};

export default AddTask;
