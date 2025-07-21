import React, { useState } from 'react';

const TestDeliveryPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('home_delivery');

  const deliveryMethods = [
    { id: 'home_delivery', name: '🏠 Giao hàng tận nhà', price: 30000, time: '2-3 ngày' },
    { id: 'express_delivery', name: '⚡ Giao hàng nhanh', price: 50000, time: '6-8 tiếng' },
    { id: 'same_day_delivery', name: '🚀 Giao hàng trong ngày', price: 80000, time: '2-4 tiếng' },
    { id: 'store_pickup', name: '🏪 Nhận tại cửa hàng', price: 0, time: '1-2 tiếng' }
  ];

  const handleMethodChange = (methodId) => {
    console.log('Changing to:', methodId);
    setSelectedMethod(methodId);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const radioOptionStyle = (isSelected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    border: `2px solid ${isSelected ? '#F8A5C2' : '#e5e7eb'}`,
    borderRadius: '8px',
    marginBottom: '12px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#fef7f0' : '#fff',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Test Phương Thức Giao Hàng
        </h1>

        <div style={{ marginBottom: '24px' }}>
          <p><strong>Phương thức đã chọn:</strong> {selectedMethod}</p>
          <p><strong>Phí ship:</strong> {formatCurrency(deliveryMethods.find(m => m.id === selectedMethod)?.price || 0)}</p>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Chọn phương thức giao hàng:</h3>
          
          {deliveryMethods.map((method) => (
            <div
              key={method.id}
              style={radioOptionStyle(selectedMethod === method.id)}
              onClick={() => handleMethodChange(method.id)}
            >
              <input
                type="radio"
                checked={selectedMethod === method.id}
                onChange={() => {}}
                style={{ margin: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {method.name}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {method.time} - {formatCurrency(method.price)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px'
        }}>
          <h4>Debug Info:</h4>
          <pre style={{ fontSize: '12px', margin: '8px 0' }}>
            {JSON.stringify({ selectedMethod }, null, 2)}
          </pre>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#F8A5C2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => {
              alert(`Đã chọn: ${deliveryMethods.find(m => m.id === selectedMethod)?.name}`);
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDeliveryPage;
