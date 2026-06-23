"use client";

import { useState } from "react";
import { uploadPDF } from "../services/api";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) return;

    const result = await uploadPDF(file);

    setMessage(result.message);
  }

  return (
    <div>
      <h2>Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files ? e.target.files[0] : null)
        }
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload
      </button>

      <p>{message}</p>
    </div>
  );
}