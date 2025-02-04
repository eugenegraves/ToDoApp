import React from 'react'

function HorizontalProgressBar({
  progress,
  height = 'h-4',
  color = 'bg-blue-500',
  bgColor = 'bg-gray-200',
  rounded = 'rounded',
}) {
  const progressBarStyle = {
    width: `${progress}%`,
    height: '100%',
    backgroundColor: color,
    borderRadius: rounded === 'rounded' ? '0.25rem' : '0px',
    transition: 'width 0.3s ease-in-out',
  }

  return (
    <div className={`relative ${height} ${rounded} ${bgColor} overflow-hidden`}>
      <div style={progressBarStyle}></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
        {`${progress}%`}
      </div>
    </div>
  )
}

export default HorizontalProgressBar
