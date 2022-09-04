import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineStar, AiFillStar, AiOutlineArrowDown } from 'react-icons/ai';

const List = ({items, removeItem, editItem, isImportant, isCompleted}) => {
    const [toggle, setToggle] = useState(false);
    const compltedList = items.filter((item) => item.status === true);
    const unCompltedList = items.filter((item) => item.status != true);
    return (
        <div className="list-wrapper">
            <ul>
                {unCompltedList.map((item) => {
                    const {id, title, important, status} = item;
                    return <li key={id}>
                        <label className="checkbox-wrapper">
                            <input type="checkbox" onChange={() => isCompleted(id)} checked={status && 'checked'} />
                            <span className="checkmark"></span>
                        </label>
                        <h3>{title} <button className={`important ${important && 'is-important'}`} onClick={()=> isImportant(id)}>{important ? <AiFillStar/> : <AiOutlineStar/>}</button></h3>
                        <div className="action">
                            <button className='edit' onClick={()=> editItem(id)}>
                                <BiEdit/>
                            </button>
                            <button className='delet' onClick={()=> removeItem(id)}>
                                <RiDeleteBin5Line/>
                            </button>
                        </div>
                    </li>
                })}               
                
            </ul>
            {compltedList.length > 0 && (
                <>
                    <p className='completed' onClick={() => setToggle(!toggle)}><AiOutlineArrowDown/> Completed <span className='count'>{compltedList.length}</span></p>
                    {toggle && (

                        <ul className='completed-list'>
                        {compltedList.map((item) => {
                            const {id, title, important, status} = item;
                            return <li key={id}>
                                <label className="checkbox-wrapper">
                                    <input type="checkbox" onChange={() => isCompleted(id)} checked={status && 'checked'} />
                                    <span className="checkmark"></span>
                                </label>
                                <h3>{title} <button className={`important ${important && 'is-important'}`} onClick={()=> isImportant(id)}>{important ? <AiFillStar/> : <AiOutlineStar/>}</button></h3>
                                <div className="action">
                                    <button className='edit' onClick={()=> editItem(id)}>
                                        <BiEdit/>
                                    </button>
                                    <button className='delet' onClick={()=> removeItem(id)}>
                                        <RiDeleteBin5Line/>
                                    </button>
                                </div>
                            </li>
                        })}               
                
                    </ul>
                    )}
                </>
            )}
            
        </div>
    );
};

export default List;