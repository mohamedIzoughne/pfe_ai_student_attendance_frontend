import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ImageCropper = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    aspect: 1
  });
  const [image, setImage] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (img) => {
    setImage(img);
  };

  const handleSave = () => {
    // Here you would implement the actual cropping logic
    // and send the cropped image to your server
    console.log('Crop data:', crop);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardContent className="p-6">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="mb-4"
          />
        </div>

        {src && (
          <div className="mb-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onImageLoad={onImageLoad}
              aspect={1}
            >
              <img src={src} alt="Upload" style={{ maxWidth: '100%' }} />
            </ReactCrop>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setSrc(null)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCropper;