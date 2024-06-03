import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-cyan-600 text-white py-1.5 sticky top-0'>
            <div className="logo">
                <span className='font-bold text-xl mx-9'>iTask</span>
            </div>
        </nav>
    )
}

export default Navbar
