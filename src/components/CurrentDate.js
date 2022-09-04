import React from 'react';
import Moment from 'moment';

export default function CurrentDate() {
    const current = Moment().format("dddd, MMMM Do");
    return (
        <div className='date'>
            {current}
        </div>
    );
}