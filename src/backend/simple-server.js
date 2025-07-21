// simple-server.js - Minimal server for testing
const http = require('http');
const url = require('url');

console.log('🚀 Starting simple server...');

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`${new Date().toISOString()} ${method} ${path}`);

  // Health check
  if (path === '/health' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: 'development'
    }));
    return;
  }

  // Test endpoint
  if (path === '/api/test' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'API is working!',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Login endpoint
  if (path === '/api/auth/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body);
        
        if (!username || !password) {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            message: 'Username and password are required'
          }));
          return;
        }
        
        if (username === 'admin' && password === 'admin123') {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'Login successful',
            data: {
              user: { id: 1, username: 'admin', role: 'admin' },
              token: 'test-token-123'
            }
          }));
        } else {
          res.writeHead(401);
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid credentials'
          }));
        }
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid JSON'
        }));
      }
    });
    return;
  }

  // Get accounts endpoint
  if (path === '/api/accounts' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'Get accounts successful',
      data: [
        { id: 1, username: 'admin', email: 'admin@test.com', role: 'admin' },
        { id: 2, username: 'staff', email: 'staff@test.com', role: 'staff' }
      ]
    }));
    return;
  }

  // 404 for other routes
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    message: 'Not found'
  }));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('  GET  /health');
  console.log('  GET  /api/test');
  console.log('  POST /api/auth/login');
  console.log('  GET  /api/accounts');
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
