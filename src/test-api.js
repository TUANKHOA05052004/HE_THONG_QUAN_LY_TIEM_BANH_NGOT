// test-api.js - Simple API test script
const http = require('http');

function testAPI(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = {
            status: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          };
          resolve(result);
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const health = await testAPI('/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response:`, health.body);
    console.log('');

    // Test 2: Admin Login
    console.log('2. Testing Admin Login...');
    const login = await testAPI('/api/auth/login', 'POST', {
      username: 'admin',
      password: 'admin123'
    });
    console.log(`   Status: ${login.status}`);
    console.log(`   Response:`, login.body);
    console.log('');

    // Test 3: Get Accounts (if login successful)
    if (login.status === 200 && login.body.success) {
      console.log('3. Testing Get Accounts...');
      const token = login.body.data.token;
      
      const accounts = await testAPI('/api/accounts', 'GET');
      console.log(`   Status: ${accounts.status}`);
      console.log(`   Response:`, accounts.body);
      console.log('');
    }

    console.log('✅ API Tests completed!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:');
      console.log('   - Make sure Docker containers are running');
      console.log('   - Check if backend is listening on port 5000');
      console.log('   - Run: docker-compose ps');
    }
  }
}

runTests();
