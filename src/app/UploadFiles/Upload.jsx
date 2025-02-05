"use client";

import { useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiTrash2, FiCheckCircle, FiRefreshCcw, FiFile } from "react-icons/fi";

const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"; // Change this
const CLOUDINARY_CLOUD_NAME = "dzl6mrlsa"; // Change this

const UploadFile = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const newFiles = uploadedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      progress: 0,
      status: "uploading",
      file: file,
      url: null,
    }));
    setFiles([...files, ...newFiles]);

    newFiles.forEach((fileData) => uploadToCloudinary(fileData));
  };

  const uploadToCloudinary = async (fileData) => {
    const formData = new FormData();
    formData.append("file", fileData.file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            updateFileProgress(fileData.id, percentCompleted);
          },
        }
      );

      updateFileStatus(fileData.id, "success", response.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
      updateFileStatus(fileData.id, "error");
    }
  };

  const updateFileProgress = (id, progress) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, progress } : file
      )
    );
  };

  const updateFileStatus = (id, status, url = null) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, progress: 100, status, url } : file
      )
    );
  };

  const retryUpload = (fileData) => {
    updateFileStatus(fileData.id, "uploading");
    uploadToCloudinary(fileData);
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto ">
      {/* File Upload Box */}
      <div className="border-dashed border-2 mt-100 border-gray-300 rounded-lg p-6 text-center bg-white shadow-md">
        <input
          type="file"
          className="hidden"
          id="fileUpload"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
          <FiUploadCloud className="text-gray-500 text-4xl mb-2" />
          <span className="text-blue-500 font-semibold">Click here</span> to upload your file
        </label>
        <p className="text-sm text-gray-500 mt-2">Supported Formats: PNG, JPG, SVG , PDF</p>
      </div>

      {/* Uploaded Files List */}
      <div className="mt-4 space-y-3">
        {files.map((file) => (
          <div key={file.id} className="bg-white p-4 rounded-lg shadow-md relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {file.url ? (
                  <img src={file.url} alt="Preview" className="h-10 w-10 object-cover rounded-md" />
                ) : (
                  <FiFile className="text-gray-500 text-3xl" />
                )}
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>

              {/* Upload Status */}
              {file.status === "uploading" && (
                <div className="text-gray-500 text-sm">
                  Uploading... {file.progress}%
                </div>
              )}
              {file.status === "success" && (
                <FiCheckCircle className="text-green-500 text-xl" />
              )}
              {file.status === "error" && (
                <div className="flex items-center text-red-500 text-sm gap-2">
                  Upload Failed <FiRefreshCcw className="cursor-pointer" onClick={() => retryUpload(file)} />
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className={`h-2 rounded-full ${
                  file.status === "success"
                    ? "bg-green-500"
                    : file.status === "error"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
                style={{ width: `${file.progress}%` }}
              ></div>
            </div>

            {/* Delete Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => removeFile(file.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
