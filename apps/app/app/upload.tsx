"use client";

import { Button } from "@craft/ui/button";
import { useState } from "react";

export default function RootPage() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setFormData(formData);
  };

  const handleUpload = async () => {
    if (!formData) {
      return;
    }

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setLastUploadedUrl(data.link);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileSelect} />
      <Button onClick={handleUpload}>Upload</Button>

      {lastUploadedUrl && <img src={lastUploadedUrl} alt="Uploaded image" />}
    </div>
  );
}
