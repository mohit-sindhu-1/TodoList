import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-cyan-600 text-white py-1.5 sticky top-0'>
            <div className="logo">
                <span className='font-bold text-xl mx-9'>iTask</span>
            </div>
            {/* <ul className="flex gap-7 mx-9">
                <li className='cursor-pointer hover:font-bold w-11'>Home</li>
                <li className='cursor-pointer hover:font-bold w-[88px]'>Your Tasks</li>
            </ul> */}
        </nav>
    )
}

export default Navbar
