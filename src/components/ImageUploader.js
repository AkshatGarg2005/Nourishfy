import React, { useState } from 'react';

export default function ImageUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!cloudName || !uploadPreset) {
      setErr('Cloudinary env vars missing');
      return;
    }
    setErr('');
    setUploading(true);
    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', uploadPreset);
      const resp = await fetch(url, { method: 'POST', body: fd });
      const data = await resp.json();
      if (data.secure_url) {
        onUploaded(data.secure_url, data.public_id);
      } else {
        setErr('Upload failed. Check preset/allow formats.');
      }
    } catch (e) {
      setErr('Upload error: ' + e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <div>Uploading...</div>}
      {err && <div style={{ color:'crimson', marginTop: 6 }}>{err}</div>}
    </div>
  );
}
