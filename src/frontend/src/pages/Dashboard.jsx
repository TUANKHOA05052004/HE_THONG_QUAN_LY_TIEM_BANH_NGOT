import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  const mainStyle = {
    marginLeft: isCollapsed ? '80px' : '280px',
    marginTop: '70px',
    padding: '24px',
    backgroundColor: '#f9fafb',
    minHeight: 'calc(100vh - 70px)',
    transition: 'margin-left 0.3s ease',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  };

  const statCardStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
  };

  const statIconStyle = {
    fontSize: '48px',
    marginBottom: '16px',
    display: 'block',
  };

  const statValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const statLabelStyle = {
    fontSize: '14px',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const chartGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  };

  const recentActivityStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const activityItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
  };

  const activityIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    fontSize: '18px',
  };

  const activityContentStyle = {
    flex: 1,
  };

  const activityTitleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '4px',
  };

  const activityTimeStyle = {
    fontSize: '12px',
    color: '#6b7280',
  };

  // Mock data
  const recentActivities = [
    {
      id: 1,
      title: 'Đơn hàng mới #1234 đã được tạo',
      time: '5 phút trước',
      icon: '📋',
      bgColor: '#dbeafe',
      iconColor: '#3b82f6',
    },
    {
      id: 2,
      title: 'Sản phẩm "Bánh kem dâu" đã được cập nhật',
      time: '15 phút trước',
      icon: '🧁',
      bgColor: '#fef3c7',
      iconColor: '#f59e0b',
    },
    {
      id: 3,
      title: 'Tài khoản mới đã được tạo',
      time: '1 giờ trước',
      icon: '👤',
      bgColor: '#d1fae5',
      iconColor: '#10b981',
    },
    {
      id: 4,
      title: 'Báo cáo doanh thu tháng đã sẵn sàng',
      time: '2 giờ trước',
      icon: '📊',
      bgColor: '#fce7f3',
      iconColor: '#ec4899',
    },
  ];

  const quickActions = [
    {
      title: 'Thêm sản phẩm mới',
      icon: '➕',
      color: '#10b981',
      action: () => console.log('Add product'),
    },
    {
      title: 'Tạo đơn hàng',
      icon: '🛒',
      color: '#3b82f6',
      action: () => console.log('Create order'),
    },
    {
      title: 'Xem báo cáo',
      icon: '📈',
      color: '#f59e0b',
      action: () => console.log('View reports'),
    },
    {
      title: 'Quản lý tài khoản',
      icon: '👥',
      color: '#ef4444',
      action: () => console.log('Manage accounts'),
    },
  ];

  const quickActionStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #e5e7eb',
  };

  const quickActionIconStyle = (color) => ({
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: color,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    marginRight: '16px',
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalOrders: 1234,
        totalRevenue: 45678000,
        totalUsers: 89,
      });
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <Header 
        title="Tổng quan" 
        isCollapsed={isCollapsed} 
        onToggleSidebar={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <main style={mainStyle}>
        {/* Stats Cards */}
        <div style={statsGridStyle}>
          <div style={{...statCardStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <span style={statIconStyle}>🧁</span>
            <div style={statValueStyle}>{stats.totalProducts}</div>
            <div style={statLabelStyle}>Sản phẩm</div>
          </div>
          
          <div style={{...statCardStyle, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
            <span style={statIconStyle}>📋</span>
            <div style={statValueStyle}>{stats.totalOrders}</div>
            <div style={statLabelStyle}>Đơn hàng</div>
          </div>
          
          <div style={{...statCardStyle, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            <span style={statIconStyle}>💰</span>
            <div style={statValueStyle}>{formatCurrency(stats.totalRevenue)}</div>
            <div style={statLabelStyle}>Doanh thu</div>
          </div>
          
          <div style={{...statCardStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
            <span style={statIconStyle}>👥</span>
            <div style={statValueStyle}>{stats.totalUsers}</div>
            <div style={statLabelStyle}>Người dùng</div>
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div style={chartGridStyle}>
          <Card title="Hoạt động gần đây">
            <div>
              {recentActivities.map((activity) => (
                <div key={activity.id} style={activityItemStyle}>
                  <div style={{
                    ...activityIconStyle,
                    backgroundColor: activity.bgColor,
                    color: activity.iconColor,
                  }}>
                    {activity.icon}
                  </div>
                  <div style={activityContentStyle}>
                    <div style={activityTitleStyle}>{activity.title}</div>
                    <div style={activityTimeStyle}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Thao tác nhanh">
            <div style={{ display: 'grid', gap: '12px' }}>
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  style={quickActionStyle}
                  onClick={action.action}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={quickActionIconStyle(action.color)}>
                    {action.icon}
                  </div>
                  <span style={{ fontWeight: '500', color: '#374151' }}>
                    {action.title}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
