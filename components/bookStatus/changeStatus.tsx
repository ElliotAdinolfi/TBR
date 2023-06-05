/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';

interface ChangeStatusProps {
  readingStatus: string;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({
  readingStatus,
}) => {
  // keep in state which of three buttons is the selected one
  const [status, setStatus] = useState(readingStatus);
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold py-8">
        Set Your Reading Status
      </h1>
      <div className="flex flex-col items-center text-lg font-bold space-y-4">
        <button
          className={`w-60 h-12 border-2 rounded-md transition-colors duration-200 ease-in-out 
          ${
            status === 'HAVENT_READ'
              ? 'bg-orange-400 text-white'
              : 'border-orange-400 hover:bg-orange-400 hover:text-white'
          }`}
          onClick={() => setStatus('HAVENT_READ')}
        >
          Haven't Read
        </button>
        <button
          className={`w-60 h-12 border-2 rounded-md transition-colors duration-200 ease-in-out 
          ${
            status === 'WANT_TO_READ'
              ? 'bg-orange-400 text-white'
              : 'border-orange-400 hover:bg-orange-400 hover:text-white'
          }`}
          onClick={() => setStatus('WANT_TO_READ')}
        >
          Want to Read
        </button>
        <button
          className={`w-60 h-12 border-2 rounded-md transition-colors duration-200 ease-in-out 
          ${
            status === 'CURRENTLY_READING'
              ? 'bg-orange-400 text-white'
              : 'border-orange-400 hover:bg-orange-400 hover:text-white'
          }`}
          onClick={() => setStatus('CURRENTLY_READING')}
        >
          Reading
        </button>
        <button
          className={`w-60 h-12 border-2 rounded-md transition-colors duration-200 ease-in-out 
          ${
            status === 'FINISHED_READING'
              ? 'bg-orange-400 text-white'
              : 'border-orange-400 hover:bg-orange-400 hover:text-white'
          }`}
          onClick={() => setStatus('FINISHED_READING')}
        >
          Finished
        </button>
        <button
          className={`w-60 h-12 border-2 rounded-md transition-colors duration-200 ease-in-out 
          ${
            status === 'COULDNT_FINISH'
              ? 'bg-orange-400 text-white'
              : 'border-orange-400 hover:bg-orange-400 hover:text-white'
          }`}
          onClick={() => setStatus('COULDNT_FINISH')}
        >
          Couldn't Finish
        </button>
      </div>
    </div>
  );
};

export default ChangeStatus;
