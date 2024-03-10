import React, { useRef, useState } from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
function AllTask() {
    // const [time, setTime] = useState(0);
    // const [isRunning, setIsRunning] = useState(false);
    // const intervalRef = useRef(null);
  
    // const startTimer = () => {
    //   setIsRunning(true);
    //   intervalRef.current = setInterval(() => {
    //     setTime((prevTime) => prevTime + 1);
    //   }, 1000);
    // };
  
    // const stopTimer = () => {
    //   setIsRunning(false);
    //   clearInterval(intervalRef.current);
    // };
  
    // const resetTimer = () => {
    //   setTime(0);
    //   clearInterval(intervalRef.current);
    //   setIsRunning(false);
    // };
  
    // const formatTime = (timeInSeconds) => {
    //   const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    //   const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    //   return `${minutes}:${seconds}`;
    // };
    const { tasks } = useContext(TaskContext);
    return (
        <div className='flex  flex-wrap gap-4 px-10 mt-6'>
            {
                (tasks.length !==0) ? (
                    tasks.map((task, index) => {
                        return (
                            <Task
                                key={index}
                                task={task}
                                id={index}
                            />
                        )
                    })
                ) : (
                    <h1>No Task Found</h1>
                )
            }
        </div>
    //     <div className="flex flex-col items-center mt-10">
    //     <div className="text-4xl font-bold">{formatTime(time)}</div>
    //     <div className="mt-4">
    //       {!isRunning ? (
    //         <button
    //           onClick={startTimer}
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
    //         >
    //           Start
    //         </button>
    //       ) : (
    //         <button
    //           onClick={stopTimer}
    //           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
    //         >
    //           Stop
    //         </button>
    //       )}
    //       <button
    //         onClick={resetTimer}
    //         className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    //       >
    //         Reset
    //       </button>
    //     </div>
    //   </div>
    );
}

export default AllTask;