"use client" ; 
import React, { useState } from "react";
import './Notifications.css';
import { FaClock, FaFileAlt, FaUserFriends, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

function NotificationApp() {
  const {projectid} = useParams();
  const [notifications, setNotifications] = useState([
    { id: 1, projectId: "P123", type: "delay", priority: "high", icon: <FaClock />, content: "Project #P123 is delayed.", time: "1m ago", read: false },
    { id: 2, projectId: "P124", type: "report", priority: "medium", icon: <FaFileAlt />, content: "New report available for Project #P124.", time: "5m ago", read: false },
    { id: 3, projectId: "P125", type: "group", priority: "low", icon: <FaUserFriends />, content: "You joined a new group: Chess Club for Project #P125.", time: "1 day ago", read: false },
    { id: 4, projectId: "P126", type: "feedback", priority: "low", icon: <FaCommentDots />, content: "Feedback received on Project #P126.", time: "5 days ago", read: false },
    { id: 5, projectId: "P127", type: "logout", priority: "medium", icon: <FaSignOutAlt />, content: "Anna Kim left the group: Chess Club for Project #P127.", time: "2 weeks ago", read: false },
    // More notifications here
  ]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [filter, setFilter] = useState('all'); // All, high, medium, low
  const [sortOrder, setSortOrder] = useState('newest'); // Newest, oldest, unread
  // setIsModalOpen(true)
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sort and Filter logic
  const filteredNotifications = notifications
    .filter(notification => filter === 'all' || notification.priority === filter)
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.time) - new Date(a.time);
      } else if (sortOrder === 'oldest') {
        return new Date(a.time) - new Date(b.time);
      } else if (sortOrder === 'unread') {
        return a.read - b.read; // unread first
      }
      return 0;
    });

  return (
    <>


      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
          >
            {/* Top feed */}
            <div className="modal-header">
              <div className="header-left">
                <h3 className="modal-title">Notifications</h3>
                <span className="unread-count">{filteredNotifications.filter(n => !n.read).length}</span>
              </div>
              <div className="header-right">
                {/* Filter Dropdown */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="dropdown"
                >
                  <option value="all">All</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                {/* Sort Dropdown */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="dropdown"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="unread">Unread First</option>
                </select>
              </div>
            </div>

            {/* Notification List */}
            <div className="notifications-list">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? "read" : "unread"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {/* Icon */}
                  <div className="notification-icon">
                    {notification.icon}
                  </div>

                  {/* Notification Content */}
                  <div className="notification-content">
                    <p className="notification-text">
                      <span className="project-id">Project ID: {notification.projectId}</span>
                      <br />
                      <span>{notification.content}</span>
                    </p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationApp;
