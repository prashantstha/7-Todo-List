import React from 'react';
import { RiCalendarTodoFill } from 'react-icons/ri';
const EmptyTodo = () => {
    return <div className="empty-card">
    <div className='icon-wrapper'><RiCalendarTodoFill/></div>
    <h2>Focus on your day</h2>
    <p>Get things done with My Day</p>
</div>
}

export default EmptyTodo;