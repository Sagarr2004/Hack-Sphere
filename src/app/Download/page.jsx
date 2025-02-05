"use client";
import { useState } from "react";
import { FaEye, FaDownload, FaTrashAlt, FaEllipsisV } from "react-icons/fa";

const files = [
  { name: "lease_contract.pdf", date: "23 Jan, 2025 - 13:40", url: "#" },
  { name: "house_rules.pdf", date: "23 Jan, 2025 - 13:41", url: "#" },
  { name: "parking_rules.pdf", date: "23 Jan, 2025 - 13:42", url: "#" },
];

export default function UploadedFiles() {
  const [fileList, setFileList] = useState(files);
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const deleteFile = (index) => {
    setFileList(fileList.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-200">
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
  );
}
