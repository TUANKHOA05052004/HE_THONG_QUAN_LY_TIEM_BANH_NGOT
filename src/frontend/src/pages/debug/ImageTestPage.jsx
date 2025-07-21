import React, { useState, useEffect } from 'react';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import ImageDebug from '../../components/debug/ImageDebug';

const ImageTestPage = () => {
  const [aboutContent, setAboutContent] = useState({
    title: 'Về Sweet Bakery',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop&crop=center'
  });

  const loadAboutContent = () => {
    const savedContent = JSON.parse(localStorage.getItem('aboutContent') || '{}');
    if (Object.keys(savedContent).length > 0) {
      setAboutContent(prev => ({ ...prev, ...savedContent }));
    }
  };

  useEffect(() => {
    loadAboutContent();
  }, []);

  const testImages = [
    {
      name: 'Unsplash Bakery 1',
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop&crop=center'
    },
    {
      name: 'Unsplash Bakery 2', 
      url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500&h=400&fit=crop&crop=center'
    },
    {
      name: 'Unsplash Bakery 3',
      url: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=500&h=400&fit=crop&crop=center'
    },
    {
      name: 'Via Placeholder',
      url: 'https://via.placeholder.com/500x400?text=Bakery+Image'
    },
    {
      name: 'Invalid URL',
      url: 'https://invalid-url-test.com/image.jpg'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          🖼️ Image Debug Test Page
        </h1>

        {/* Current About Content */}
        <section style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            📋 Current About Content
          </h2>
          
          <div style={{ marginBottom: '16px' }}>
            <strong>Title:</strong> {aboutContent.title}
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <strong>Image URL:</strong>
            <div style={{
              wordBreak: 'break-all',
              fontSize: '14px',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              padding: '8px',
              borderRadius: '4px',
              marginTop: '4px'
            }}>
              {aboutContent.image}
            </div>
          </div>

          <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold' }}>
            ResponsiveImage Component:
          </h3>
          <div style={{
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f9fafb'
          }}>
            <ResponsiveImage
              src={aboutContent.image}
              alt={aboutContent.title}
              aspectRatio="landscape"
              style={{
                borderRadius: '8px',
                maxHeight: '300px',
              }}
              fallbackSrc="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop&crop=center"
            />
          </div>
        </section>

        {/* Test Images */}
        <section style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            🧪 Test Images
          </h2>

          {testImages.map((image, index) => (
            <ImageDebug
              key={index}
              src={image.url}
              alt={image.name}
              title={image.name}
            />
          ))}
        </section>

        {/* Actions */}
        <section style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            🔧 Actions
          </h2>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const newImage = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500&h=400&fit=crop&crop=center';
                setAboutContent(prev => ({ ...prev, image: newImage }));
                localStorage.setItem('aboutContent', JSON.stringify({ ...aboutContent, image: newImage }));
              }}
              style={{
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Set Good Image
            </button>

            <button
              onClick={() => {
                const newImage = 'https://invalid-url.com/image.jpg';
                setAboutContent(prev => ({ ...prev, image: newImage }));
                localStorage.setItem('aboutContent', JSON.stringify({ ...aboutContent, image: newImage }));
              }}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Set Bad Image
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('aboutContent');
                loadAboutContent();
              }}
              style={{
                backgroundColor: '#6b7280',
                color: '#fff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Reset to Default
            </button>

            <button
              onClick={() => {
                window.location.href = '/';
              }}
              style={{
                backgroundColor: '#F8A5C2',
                color: '#fff',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageTestPage;
