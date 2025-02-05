// "use client";
// import { useState } from "react";
// import { FaEye, FaDownload, FaTrashAlt, FaEllipsisV } from "react-icons/fa";

// const files = [
//   { name: "lease_contract.pdf", date: "23 Jan, 2025 - 13:40", url: "#" },
//   { name: "house_rules.pdf", date: "23 Jan, 2025 - 13:41", url: "#" },
//   { name: "parking_rules.pdf", date: "23 Jan, 2025 - 13:42", url: "#" },
// ];

// export default function UploadedFiles() {
//   const [fileList, setFileList] = useState(files);
//   const [menuOpen, setMenuOpen] = useState(null);

//   const toggleMenu = (index) => {
//     setMenuOpen(menuOpen === index ? null : index);
//   };

//   const deleteFile = (index) => {
//     setFileList(fileList.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-200">
//       <h2 className="text-lg font-semibold mb-4">Uploaded Documents</h2>

//       {fileList.map((file, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-between p-3 border-b last:border-none relative"
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gray-200 rounded">
//               <FaEye className="text-gray-600" />
//             </div>
//             <div>
//               <p className="font-medium">{file.name}</p>
//               <p className="text-gray-500 text-sm">{file.date}</p>
//             </div>
//           </div>

//           <div className="relative">
//             <button onClick={() => toggleMenu(index)} className="p-2 text-gray-500">
//               <FaEllipsisV />
//             </button>

//             {menuOpen === index && (
//               <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-36 py-2">
//                 <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
//                   <FaEye /> View file
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
//                   <FaDownload /> Download file
//                 </button>
//                 <button
//                   className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
//                   onClick={() => deleteFile(index)}
//                 >
//                   <FaTrashAlt /> Delete file
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client" ; 
import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaChartBar,
  FaCog,
  FaFileUpload,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import {
  MdDashboard,
  MdFileDownload,
  MdOutlineEmail,
  MdSubscriptions,
  MdFeedback,
  MdHelp,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Download.css";
import Link from "next/link";
import { FaEye, FaDownload, FaTrashAlt, FaEllipsisV } from "react-icons/fa";

const files = [
  { name: "lease_contract.pdf", date: "23 Jan, 2025 - 13:40", url: "#" },
  { name: "house_rules.pdf", date: "23 Jan, 2025 - 13:41", url: "#" },
  { name: "parking_rules.pdf", date: "23 Jan, 2025 - 13:42", url: "#" },
];

const Dashboard = () => { 
  const [fileList, setFileList] = useState(files);
    const [menuOpen, setMenuOpen] = useState(null);
  
    const toggleMenu = (index) => {
      setMenuOpen(menuOpen === index ? null : index);
    };
  
    const deleteFile = (index) => {
      setFileList(fileList.filter((_, i) => i !== index));
    };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const barData = [
    { name: "File 1", Accuracy: 6, Confidence: 4 },
    { name: "File 2", Accuracy: 14, Confidence: 8 },
    { name: "File 3", Accuracy: 9, Confidence: 10 },
    { name: "File 4", Accuracy: 6, Confidence: 6 },
  ];

  const pieData = [
    { name: "Pending", value: 33.3, color: "#ff595e" },
    { name: "Processed", value: 66.7, color: "#56cfe1" },
  ];

  return (
    <div className="bg-[radial-gradient(ellipse_10%_70%_at_bottom_left,#183ec2,#eaeefe_70%)] ">
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TEAM ASTRA</h2>
        <nav>
          <ul>
            <li className="light">
              <MdDashboard /> Home
            </li>
            <li className="light">
              
            <FaFileUpload /> <Link href="UploadFiles">    Upload Files
              </Link>
            </li>
            <li className="active">
            <FaChartBar /> <Link href="Results"> Results</Link>
            </li>
            <li className="light">
            <MdOutlineEmail /><Link href="Score"> Confidence Score</Link>
            </li>
            <li className="light">
            <MdSubscriptions /><Link href="subscription"> Subscription</Link>
            </li>
           
            <li className="light">
            <MdFeedback /><Link href="Feedback"> Feedback</Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <ul>
            <li className="light">
            <FaCog /><Link href="settings">  Settings</Link>
            </li>
            <li className="light">
            <MdHelp /> <Link href="Help">  Help</Link>
            </li>
            <li className="light">
            <FaSignOutAlt /> <Link href="/"> Logout</Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
     
      <main className="main-content">
        <header>
          <h2 className="text-bold font-bold text-4xl">Welcome 👋, Atharva</h2>
          <div className="header-icons">
           <Link href="Notifications"> <FaBell /></Link>
            
            {/* User Icon with Dropdown */}
            <div className="user-dropdown" ref={dropdownRef}>
              <FaUser className="user-icon" onClick={toggleDropdown} />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <FaUser /> Profile
                    </li>
                    <li>
                      <FaCog /> Settings
                    </li>
                    <li>
                      <FaSignOutAlt /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <FaCog />
          </div>
        </header>
             <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-300">
       <h2 className="text-lg font-semibold mb-4">Uploaded Documents</h2>

      {fileList.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border-b last:border-none relative"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-200 rounded">
              <FaEye className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-gray-500 text-sm">{file.date}</p>
            </div>
          </div>

          <div className="relative">
            <button onClick={() => toggleMenu(index)} className="p-2 text-gray-500">
              <FaEllipsisV />
            </button>

            {menuOpen === index && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-36 py-2">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
                  <FaEye /> View file
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
                  <FaDownload /> Download file
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  onClick={() => deleteFile(index)}
                >
                  <FaTrashAlt /> Delete file
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
       
      </main>

    </div>
    </div>
  );
};

export default Dashboard;

