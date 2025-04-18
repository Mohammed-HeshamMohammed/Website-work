"use client"

type StepProgressProps = {
  currentStep: number
}

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex justify-center mb-6 md:mb-8">
      <div className="flex items-center space-x-1 sm:space-x-4">
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base ${currentStep >= 1 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
        <div className={`h-1 w-8 sm:w-20 ${currentStep >= 2 ? 'bg-[#0077B6]' : 'bg-gray-200'}`}></div>
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base ${currentStep >= 2 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        <div className={`h-1 w-8 sm:w-20 ${currentStep >= 3 ? 'bg-[#0077B6]' : 'bg-gray-200'}`}></div>
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base ${currentStep >= 3 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
      </div>
    </div>
  )
}