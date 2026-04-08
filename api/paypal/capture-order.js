export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderID } = req.body;
  if (!orderID) {
    return res.status(400).json({ error: 'Missing orderID.' });
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const paypalEnv = process.env.PAYPAL_ENV || 'sandbox';
  const baseURL = paypalEnv === 'production' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  if (!clientId || !clientSecret) {
    if (!clientId) console.error('[PayPal SDK] FATAL: PAYPAL_CLIENT_ID environment variable is missing from Vercel Runtime.');
    if (!clientSecret) console.error('[PayPal SDK] FATAL: PAYPAL_CLIENT_SECRET environment variable is missing from Vercel Runtime.');
    return res.status(500).json({ error: "PayPal configuration error on server." });
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${baseURL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      }
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("PayPal Capture Error Response:", text);
        return res.status(response.status).json({ error: "Failed capturing order from PayPal." });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Critical server-side PayPal capture error:", error);
    res.status(500).json({ error: 'Failed to capture PayPal order' });
  }
}
