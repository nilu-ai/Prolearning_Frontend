import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignJustify } from "react-icons/fa";
import Avatar from './avatar';
import { useSelector } from 'react-redux';
import { IoIosHome } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { GrDocumentPerformance } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";



const Header = ({isSideNavOpen, setIsSideNavOpen}) => {
  const data = useSelector(store => store.user.data);
  
 // const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-[#FF725E] border-solid border-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {!isSideNavOpen && (
            <button onClick={toggleSideNav} className="absolute top-4 p-4 left-4 z-0 p-2 bg-[#FF725E] text-white rounded-md">
              <FaAlignJustify />
            </button>
          )}

          <div className='mx-2 sm:mx-8 w-2 sm:w-fit invisible sm:visible'>
            <Link  className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white z-0 ">HI! {data?.fullName}</span>
            </Link>
          </div>
          <div className='flex flex-row items-center'>
            <div className="border-2 border-black w-fit font-medium bg-[#FF725E] rounded-md p-2 hover:bg-[#f1bb87] transition-all hover:rounded-3xl text-white">
              {data?.role}
            </div>
            <div className='relative mx-2' ref={dropdownRef}>
              <div onClick={toggleDropdown}>
                <Avatar />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                 <Link to={`/${data?.role}/dashboard`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                  <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isSideNavOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
       <div className='flex justify-between p-2 m-4'><h1 className='text-2xl '>Prolearning</h1><button onClick={toggleSideNav} className="p-2 text-black bg-gray-200 rounded-md"><IoMdClose size={20}/></button></div> 
        <div className="p-2">
         <div className='flex p-2 m-2 gap-2'><div className='p-1'><IoIosHome size={20} color={"red"} /></div><div><Link to={`/${data?.role}/dashboard`} className="text-xl text-bold">HOME</Link></div></div> 
         { data?.role!=="PARENT"      &&     <div className='flex p-2 m-2 gap-2'><div className='p-1'><FaBookOpen size={20} color={"red"}/></div><div><Link to={"/studymaterial"} className="text-xl text-bold">STUDY MATERIAL</Link></div></div> }
         <div className='flex p-2 m-2 gap-2'><div className='p-1'><FaRegPenToSquare size={20} color={"red"}/></div><div><Link to={`/${data?.role}/test`} className="text-xl text-bold">TEST</Link></div></div> 
{ data?.role!=="PARENT"      &&  <div className='flex p-2 m-2 gap-2'><div className='p-1'><FaPeopleGroup size={20} color={"red"}/></div><div><Link to={`/${data?.role}/community`} className="text-xl text-bold">Community</Link></div></div> 
}{ data?.role!=="TEACHER"    &&    <div className='flex p-2 m-2 gap-2'><div className='p-1'><GrDocumentPerformance size={20} color={"red"}/></div><div><Link to={`/${data?.role}/performance`} className="text-xl text-bold">PERFORMANCE</Link></div></div> 
}


          
          {/* Add more links as needed */}
        </div>
      </div>
    </>
  );
};

export default Header;
