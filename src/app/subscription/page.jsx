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
import "./Subscription.css";
import Link from "next/link";
import { Pricing } from "@/sections/Pricing";
import CheckIcon from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import {motion} from "framer-motion";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];


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
            <li className="light">
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
            <li className="active">
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
        <section className="py-24 bg-none">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">
            Free forever. Upgrade for unlimited tasks, better security, and
            exclusive features.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({
              title,
              monthlyPrice,
              buttonText,
              popular,
              inverse,
              features,
            }) => (
              <div
                className={twMerge(
                  "card",
                  inverse === true && "border-black bg-black text-white"
                )}
                key={title}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-lg font-bold text-black/50",
                      inverse === true && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                      animate={{
                        backgroundPositionX: "100%",
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                      }}
                      className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium">
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span className="tracking-tight font-bold text-black/50">
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px]",
                    inverse === true && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm flex items-center gap-4"
                    >
                      <CheckIcon className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
          <div>
            <h3></h3>
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
