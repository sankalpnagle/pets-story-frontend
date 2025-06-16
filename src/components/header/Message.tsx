import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link } from "react-router-dom";
import ClickOutside from '../ClickOutside';
import img from "/assets/images/user/user-07.png";


// import UserOne from '../../images/user/user-01.png';
// import UserTwo from '../../images/user/user-02.png';
// import UserThree from '../../images/user/user-03.png';
// import UserFour from '../../images/user/user-04.png';

const Message = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-full bg-slate-50"
        >
          <EmailOutlinedIcon className="text-slate-500" style={{ fontSize: "20px" }} />
        </button>

        {/* Dropdown Start */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded shadow-lg">
            <div className="px-4 py-3 border-b border-slate-200">
              <h5 className="text-sm font-medium text-gray-700">Messages</h5>
            </div>

            <ul className="flex flex-col max-h-60 overflow-y-auto"> 
              <li className="border-b border-gray-200">
                <Link to="/messages" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                  <img src={img} alt="User" className="h-12 w-12 rounded-full" />
        

                  <div>
                    <h6 className="text-sm font-medium text-gray-800">Robert Jhon</h6>
                    <p className="text-sm text-gray-600">Can you share your offer?</p>
                    <p className="text-xs text-gray-400">10min ago</p>
                  </div>
                </Link>
              </li>
              <li className="border-b border-gray-200">
                <Link to="/messages" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                  <img src={img} alt="User" className="h-12 w-12 rounded-full" />
                  <div>
                    <h6 className="text-sm font-medium text-gray-800">Mariya Desoja</h6>
                    <p className="text-sm text-gray-600">I like your confidence 💪</p>
                    <p className="text-xs text-gray-400">2min ago</p>
                  </div>
                </Link>
              </li>
              {/* Add more list items as needed */}
              <li className="border-b border-gray-200">
                <Link to="/messages" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                  <img src={img} alt="User" className="h-12 w-12 rounded-full" />
                  <div>
                    <h6 className="text-sm font-medium text-gray-800">Mariya Desoja</h6>
                    <p className="text-sm text-gray-600">I like your confidence 💪</p>
                    <p className="text-xs text-gray-400">2min ago</p>
                  </div>
                </Link>
              </li>
              <li className="border-b border-gray-200">
                <Link to="/messages" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                  <img src={img} alt="User" className="h-12 w-12 rounded-full" />
                  <div>
                    <h6 className="text-sm font-medium text-gray-800">Mariya Desoja</h6>
                    <p className="text-sm text-gray-600">I like your confidence 💪</p>
                    <p className="text-xs text-gray-400">2min ago</p>
                  </div>
                </Link>
              </li>
              <li className="border-b border-gray-200">
                <Link to="/messages" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                  <img src={img} alt="User" className="h-12 w-12 rounded-full" />
                  <div>
                    <h6 className="text-sm font-medium text-gray-800">Mariya Desoja</h6>
                    <p className="text-sm text-gray-600">I like your confidence 💪</p>
                    <p className="text-xs text-gray-400">2min ago</p>
                  </div>
                </Link>
              </li>
              <li className="border-b border-gray-200">
                <Link to="/messages" className="flex gap-4 px-4 py-3 hover:bg-gray-100">
                  <img src={img} alt="User" className="h-12 w-12 rounded-full" />
                  <div>
                    <h6 className="text-sm font-medium text-gray-800">Mariya Desoja</h6>
                    <p className="text-sm text-gray-600">I like your confidence 💪</p>
                    <p className="text-xs text-gray-400">2min ago</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
        {/* Dropdown End */}
      </div>
    </ClickOutside>
  );
};

export default Message;

// ----------------------------------------------------
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// // import ClickOutside from 'react-click-outside';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import ClickOutside from '../ClickOutside';

// const MessageDropdown = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [notifying, setNotifying] = useState(true);

//   return (
//     <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
//       <li className="relative">
//         <Link
//           onClick={() => {
//             setNotifying(false);
//             setDropdownOpen(!dropdownOpen);
//           }}
//           className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-gray hover:text-primary"
//           to="#"
//         >
//           <span
//             className={`absolute top-1 right-1 z-1 h-2 w-2 rounded-full bg-meta-1 ${
//               notifying === false ? 'hidden' : 'inline'
//             }`}
//           >
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
//           </span>

//           <EmailOutlinedIcon 
//             className="text-slate-500"
//             style={{ fontSize: "24px" }}
//           />
//         </Link>

//         {/* <!-- Dropdown Start --> */}
//         {dropdownOpen && (
//           <div
//             className="absolute right-0 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default sm:w-80"
//           >
//             <div className="px-4.5 py-3">
//               <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
//             </div>

//             <ul className="flex h-auto flex-col overflow-y-auto">
//               <li>
//                 <Link
//                   className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
//                   to="/messages"
//                 >
//                   <div className="h-12.5 w-12.5 rounded-full">
//                     {/* <img src={UserTwo} alt="User" /> */}
//                   </div>

//                   <div>
//                     <h6 className="text-sm font-medium text-black">
//                       Mariya Desoja
//                     </h6>
//                     <p className="text-sm">I like your confidence 💪</p>
//                     <p className="text-xs">2min ago</p>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
//                   to="/messages"
//                 >
//                   <div className="h-12.5 w-12.5 rounded-full">
//                     {/* <img src={UserOne} alt="User" /> */}
//                   </div>

//                   <div>
//                     <h6 className="text-sm font-medium text-black">
//                       Robert Jhon
//                     </h6>
//                     <p className="text-sm">Can you share your offer?</p>
//                     <p className="text-xs">10min ago</p>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
//                   to="/messages"
//                 >
//                   <div className="h-12.5 w-12.5 rounded-full">
//                     {/* <img src={UserThree} alt="User" /> */}
//                   </div>

//                   <div>
//                     <h6 className="text-sm font-medium text-black">
//                       Henry Dholi
//                     </h6>
//                     <p className="text-sm">I came across your profile and...</p>
//                     <p className="text-xs">1 day ago</p>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
//                   to="/messages"
//                 >
//                   <div className="h-12.5 w-12.5 rounded-full">
//                     {/* <img src={UserFour} alt="User" /> */}
//                   </div>

//                   <div>
//                     <h6 className="text-sm font-medium text-black">
//                       Cody Fisher
//                     </h6>
//                     <p className="text-sm">I’m waiting for your response!</p>
//                     <p className="text-xs">5 days ago</p>
//                   </div>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2"
//                   to="/messages"
//                 >
//                   <div className="h-12.5 w-12.5 rounded-full">
//                     {/* <img src={UserTwo} alt="User" /> */}
//                   </div>

//                   <div>
//                     <h6 className="text-sm font-medium text-black">
//                       Mariya Desoja
//                     </h6>
//                     <p className="text-sm">I like your confidence 💪</p>
//                     <p className="text-xs">2 min ago</p>
//                   </div>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}
//         {/* <!-- Dropdown End --> */}
//       </li>
//     </ClickOutside>
//   );
// };

// export default MessageDropdown;
