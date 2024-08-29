const Spinner = () => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-blackBg z-[5000] flex justify-center items-center'>
      <div className='w-[64px] h-[64px] border-[18px] border-t-[#000] border-r-transparent border-b-[#555] border-l-transparent border-double animate-spin' />
    </div>
  )
}

export default Spinner
