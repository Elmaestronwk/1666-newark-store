export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items } = req.body;
  const totalAmount = items.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
    return total + (numericPrice * item.quantity);
  }, 0).toFixed(2);

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("PayPal secrets not set. Mocking order creation.");
    return res.status(200).json({ id: "MOCK_ORDER_" + Date.now() });
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: totalAmount }
        }]
      })
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("PayPal Order error", error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
}
