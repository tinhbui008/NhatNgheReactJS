import React, { useState, useEffect } from 'react';
export const DemoHook = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Nhất Nghệ');

    //Luôn gọi, sau render và khi state/prop thay đổi giá trị
    useEffect(() => {
        console.log(`${name} Click ${count} lần.`);

        //clean
        return () => { console.log("Clean data TH1..."); }
    });

    //Gọi 1 lần duy nhất sau render
    useEffect(() => {
        console.log(`Click [] ${count} lần.`);

        return () => { console.log("Clean data TH2..."); }
    }, []);

    //Gọi sau render và khi name thay đổi
    useEffect(() => {
        console.log(`TH3 ${name} thay đổi`);

        return () => { console.log("Clean data TH3..."); }
    }, [name]);

    return (
        <div>
            <h2>Demo Hook</h2>
            <h4>{name} Click {count} lần</h4>
            <button onClick={() => setName(name + count)} > Click thay đổi tên</button>
            <button onClick={() => setCount(count + 1)} > Click tăng số</button>
        </div>
    );
}