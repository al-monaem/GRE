import React from 'react'

const Header = ({ title }) => {
    return (
        <div className='w-full h-[10%] flex py-10 pl-10 font-bold tracking-wide text-2xl'>
            {title}
        </div>
    )
}

export default Header