"use client" ; 
import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaFileUpload, FaUpload, FaShareAlt, FaUser, FaSignOutAlt, FaCog, FaChartBar, FaUsers } from "react-icons/fa";
import { MdDashboard, MdFeedback, MdFileDownload, MdHelp, MdOutlineEmail, MdSubscriptions } from "react-icons/md";
import "./UploadFiles.css";

import UploadFile from "./Upload" ; 
import Link from "next/link";

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [fileDomain, setFileDomain] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">TEAM ASTRA</h2>
        <nav>
          <ul>
            <li className="light">
              <MdDashboard /><Link href="dashboard"> Home </Link>
            </li>
            <li className="active">
              <FaFileUpload /> <Link href="UploadFiles"> Upload Files </Link>
            </li>
            <li className="light">
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
              <FaCog /><Link href="settings"> Settings</Link>
            </li>
            <li className="light">
              <MdHelp /> <Link href="Help"> Help</Link>
            </li>
            <li className="light">
              <FaSignOutAlt /> <Link href="/"> Logout</Link>
            </li>
          </ul>
        </div>
      </aside>
      
      <main className="main-content">
        <header>
          <h2 className="text-bold font-bold text-4xl">Welcome 👋, Atharva</h2>
          <div className="header-icons">
            <Link href="Notifications"> <FaBell /></Link>
            <div className="user-dropdown" ref={dropdownRef}>
              <FaUser className="user-icon" onClick={toggleDropdown} />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>Profile</li>
                    <li>Settings</li>
                    <li>Logout</li>
                  </ul>
                </div>
              )}
            </div>
            <FaCog />
          </div>
        </header>
        
        <div className="box">
        <div className="pdf-input-container">
            <input 
              type="text" 
              className="pdf-input" 
              placeholder="Enter PDF or important data link..." 
              value={pdfLink} 
              onChange={(e) => setPdfLink(e.target.value)}
            />
            <button className="pdf-submit-btn">Submit</button>
            <button className="collaborator-btn">
              <FaUsers style={{ marginLeft: '20px' }} /> Add Collaborator
            </button> 
            <button className="collaborato-btn">
              <FaShareAlt style={{ marginLeft: '20px' }} /> Share
            </button> 
          </div>
          <div className="mt-20">
          <UploadFile />
          </div>
          {/* Input field for PDF or important data link */}
       

          {/* Collaborator Button */}
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
