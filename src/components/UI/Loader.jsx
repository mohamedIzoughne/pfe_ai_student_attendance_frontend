import { twMerge } from 'tailwind-merge'

const Loader = ({className = ''}) => {
  return (
    <div className={twMerge('h-dvh flex items-center justify-center', className)}>
      <div className='spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader