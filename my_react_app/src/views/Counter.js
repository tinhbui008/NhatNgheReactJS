import React, { useState } from 'react'

export const Counter = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        let N = count + 1;
        setCount(N);
    }
    return (
        <div>
            <h3>Hello</h3>
            <h2>Number: {count}</h2>
            <button onClick={() => incrementCount()}>Tăng</button>
        </div>
    )
}