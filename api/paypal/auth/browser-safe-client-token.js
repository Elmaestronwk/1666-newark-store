export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const paypalEnv = process.env.PAYPAL_ENV || 'sandbox'; 
  const baseURL = paypalEnv === 'production' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  if (!clientId || !clientSecret) {
    if (!clientId) console.error('[PayPal SDK Auth] WARN: PAYPAL_CLIENT_ID environment variable is missing. Defaulting to fallback locally.');
    if (!clientSecret) console.error('[PayPal SDK Auth] WARN: PAYPAL_CLIENT_SECRET environment variable is missing. Defaulting to fallback locally.');
    return res.status(200).json({ accessToken: 'test_token' });
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const host = req.headers.host || 'localhost:5173';
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const originUrl = `${protocol}://${host}`;

    const formBody = new URLSearchParams();
    formBody.append('grant_type', 'client_credentials');
    formBody.append('domains[]', originUrl);
    formBody.append('response_type', 'client_token');

    const response = await fetch(`${baseURL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`
      },
      body: formBody.toString()
    });

    if (!response.ok) {
       const text = await response.text();
       console.error("PayPal Token Error Response:", text);
       return res.status(response.status).json({ error: "Failed fetching client token." });
    }

    const data = await response.json();
    res.status(200).json({ accessToken: data.access_token || data.client_token });
  } catch (error) {
    console.error("PayPal token error:", error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
}
