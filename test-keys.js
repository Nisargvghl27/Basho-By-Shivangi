const http = require('http');

const data = JSON.stringify({
  amount: 10000,
  currency: 'INR',
  receipt: 'test_receipt_123',
  shipping: { firstName: 'Test', lastName: 'User', email: 'test@example.com' }
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/create-razorpay-order',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      if (res.statusCode === 200) {
        console.log('✅ SUCCESS! Razorpay order created:', parsed.id);
      } else {
        console.log('❌ FAILED:', JSON.stringify(parsed, null, 2));
      }
    } catch (e) {
      console.log('BODY:', body.slice(0, 500));
    }
  });
});
req.on('error', (e) => { console.error('Request error:', e.message); });
req.write(data);
req.end();
