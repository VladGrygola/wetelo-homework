import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';

const ImageUploadContainer = ({ file }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState(undefined);

  useEffect(() => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        setIsLoading(false);
        setSrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!file) return null;

  if (isLoading) return <CircularProgress />;

  return <img src={src} alt={file.name} height={300} />;
};

export default ImageUploadContainer;
