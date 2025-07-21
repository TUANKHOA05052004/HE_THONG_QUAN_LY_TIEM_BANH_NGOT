import React, { useState } from 'react';

const ImageDebug = ({ src, alt, title = "Image Debug" }) => {
  const [imageStatus, setImageStatus] = useState('loading');
  const [imageInfo, setImageInfo] = useState({});

  const handleImageLoad = (e) => {
    setImageStatus('loaded');
    setImageInfo({
      naturalWidth: e.target.naturalWidth,
      naturalHeight: e.target.naturalHeight,
      displayWidth: e.target.width,
      displayHeight: e.target.height,
    });
  };

  const handleImageError = (e) => {
    setImageStatus('error');
    setImageInfo({
      error: e.target.error || 'Unknown error',
      src: e.target.src,
    });
  };

  const getStatusColor = () => {
    switch (imageStatus) {
      case 'loading': return '#f59e0b';
      case 'loaded': return '#10b981';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      border: `2px solid ${getStatusColor()}`,
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0',
      backgroundColor: '#f9fafb',
    }}>
      <h3 style={{ 
        color: getStatusColor(), 
        margin: '0 0 12px 0',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        {title} - Status: {imageStatus.toUpperCase()}
      </h3>
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Source URL:</strong>
        <div style={{ 
          wordBreak: 'break-all', 
          fontSize: '12px', 
          color: '#6b7280',
          backgroundColor: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          marginTop: '4px'
        }}>
          {src || 'No source provided'}
        </div>
      </div>

      {imageInfo.naturalWidth && (
        <div style={{ marginBottom: '12px', fontSize: '14px' }}>
          <strong>Image Info:</strong>
          <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
            <li>Natural: {imageInfo.naturalWidth} × {imageInfo.naturalHeight}</li>
            <li>Display: {imageInfo.displayWidth} × {imageInfo.displayHeight}</li>
          </ul>
        </div>
      )}

      {imageStatus === 'error' && (
        <div style={{ 
          color: '#ef4444', 
          fontSize: '14px',
          backgroundColor: '#fef2f2',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '12px'
        }}>
          <strong>Error:</strong> Failed to load image
          {imageInfo.error && <div>Details: {imageInfo.error}</div>}
        </div>
      )}

      <div style={{ 
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '200px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

export default ImageDebug;
