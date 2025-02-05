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
import "./Dashboard.css";
import Link from "next/link";

const Dashboard = () => {
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
            <li className="active">
              <MdDashboard /> Home
            </li>
            <li className="light">
              
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

        {/* Dashboard Grid Layout */}
        <section className="dashboard-grid">
          {/* Left Section: Stats + Bar Graph */}
          <div className="left-section">
            <div className="stats">
              <div className="hii">
                <div className="stat-card total">
                  <h3>Total PDFs</h3>
                  <p>35</p>
                </div>
                <div className="stat-card progress">
                  <h3>PDFs In Progress</h3>
                  <p>29</p>
                </div>
              </div>
              <div className="hii">
                <div className="stat-card completed">
                  <h3>Completed</h3>
                  <p>06</p>
                </div>
                <div className="stat-card results">
                  <h3>Results</h3>
                  <p>03</p>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <section className="progress-bars">
              <h3>Processing Progress</h3>

              <div className="progress">
                <div className="progress-label">
                  <span>File Processing</span>
                  <span>75%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill file-processing"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div className="progress">
                <div className="progress-label">
                  <span>Accuracy</span>
                  <span>85%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill accuracy"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <div className="progress">
                <div className="progress-label">
                  <span>Confidence Level</span>
                  <span>65%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill confidence"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
            </section>

            {/* Charts */}
            <div className="char">
              <div className="bar-chart">
                <h3>Accuracy vs Confidence</h3>
                <BarChart width={400} height={250} data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Accuracy" fill="#56cfe1" />
                  <Bar dataKey="Confidence" fill="#4cc9f0" />
                </BarChart>
              </div>

              {/* Right Section: Pie Chart */}
              <div className="right-section">
                <div className="pie-chart">
                  <h3>Processing Status</h3>
                  <PieChart width={250} height={250}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
    </div>
  );
};

export default Dashboard;
