"use client" ; 
import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaFileUpload, FaUpload, FaShareAlt, FaUser, FaSignOutAlt, FaCog, FaChartBar } from "react-icons/fa";
import { MdDashboard, MdFeedback, MdFileDownload, MdHelp, MdOutlineEmail, MdSubscriptions } from "react-icons/md";
import "./UploadFiles.css";

import UploadFile from "./Upload" ; 
import Link from "next/link";

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [fileDomain, setFileDomain] = useState("");

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

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    const newFiles = Array.from(uploadedFiles).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB", // Size in KB
      uploadTime: new Date().toLocaleString(),
      file
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleDomainChange = (e) => {
    setFileDomain(e.target.value);
  };

  const handleFileClick = (file) => {
    const fileURL = URL.createObjectURL(file.file);
    const fileExtension = file.name.split(".").pop().toLowerCase();
    
    // Open PDF, image or other files in a new window or download
    if (fileExtension === "pdf") {
      window.open(fileURL, "_blank");
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      window.open(fileURL, "_blank");
    } else {
      // For unsupported file types, prompt download
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = file.name;
      link.click();
    }
  };

  const handleShare = (file) => {
    const fileURL = URL.createObjectURL(file.file);
    const shareData = {
      title: `File: ${file.name}`,
      text: `Check out this file: ${file.name}. Size: ${file.size}, Uploaded on: ${file.uploadTime}`,
      url: fileURL
    };

    if (navigator.share) {
      // Use the native share API if available
      navigator.share(shareData)
        .then(() => console.log("File shared successfully"))
        .catch((error) => console.log("Error sharing file", error));
    } else {
      // Fallback if native share is not available
      alert("Sharing is not supported on this device/browser.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TEAM ASTRA</h2>
        <nav>
          <ul>
            <li className="light">
              <MdDashboard /><Link href="dashboard"> Home </Link>
            </li>
            <li className="active">
              
            <FaFileUpload /> <Link href="UploadFiles">    Upload Files
              </Link>
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
            <MdFileDownload /><Link href="Download"> Download Files</Link>
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
          <h2>Welcome 👋, Atharva</h2>
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
        <UploadFile />

      

        {/* Footer Section */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            style={{
              padding: '10px 20px',
              border: '2px solid #6a4cfc',
              borderRadius: '5px',
              backgroundColor: 'transparent',
              color: '#6a4cfc',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <FaShareAlt style={{ marginRight: '10px' }} />
            Share
          </button>
        </div> 
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
