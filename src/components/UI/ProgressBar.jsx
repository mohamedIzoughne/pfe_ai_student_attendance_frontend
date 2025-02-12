import React from 'react'
import { Check } from 'lucide-react'

const ProgressBar = ({ step, className }) => {
  return (
    <div className={'flex items-center w-[500px] ' + className}>
      {/* First Step */}
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          step >= 1 ? 'border-blue-500 bg-white' : 'bg-[#BFBFBF]'
        }`}
      >
        <div
          className={`flex justify-center items-center rounded-full ${
            step > 1
              ? ' bg-blue-500 w-full h-full'
              : step == 1
              ? ' bg-blue-500 w-3 h-3'
              : ' bg-transparent w-3 h-3'
          }`}
        >
          <Check
            size={16}
            className={' stroke-white ' + (step <= 1 ? 'hidden' : '')}
          />
        </div>
      </div>

      {/* Line 1 */}
      <div
        className={`flex-1 h-[1px] ${
          step > 1 ? 'bg-blue-500' : 'bg-[#BFBFBF]'
        }`}
      />

      {/* Second Step */}
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          step >= 2 ? 'border-blue-500 bg-white' : 'bg-[#BFBFBF]'
        }`}
      >
        <div
          className={`flex justify-center items-center rounded-full ${
            step > 2
              ? ' bg-blue-500 w-full h-full'
              : step == 2
              ? ' bg-blue-500 w-3 h-3'
              : ' bg-transparent w-3 h-3'
          }`}
        >
          <Check
            size={16}
            className={' stroke-white ' + (step <= 2 ? 'hidden' : '')}
          />
        </div>
      </div>

      {/* Line 2 */}
      <div
        className={`flex-1 h-[1px] ${
          step > 2 ? 'bg-blue-500' : 'bg-[#BFBFBF]'
        }`}
      />
      {/* Third Step */}
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          step >= 3 ? 'border-blue-500 bg-white' : 'bg-[#BFBFBF]'
        }`}
      >
        <div
          className={`flex justify-center items-center rounded-full ${
            step > 3
              ? ' bg-blue-500 w-full h-full'
              : step == 3
              ? ' bg-blue-500 w-3 h-3'
              : ' bg-transparent w-3 h-3'
          }`}
        >
          <Check
            size={16}
            className={' stroke-white ' + (step <= 3 ? 'hidden' : '')}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
