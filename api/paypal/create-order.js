export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Invalid cart payload.' });
  }

  let totalAmount = 0;
  const mappedItems = items.map(item => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    totalAmount += numericPrice * item.quantity;
    
    return {
      name: item.name,
      description: `Size: ${item.size} | Color: ${item.color} | Fit: ${item.fit}`,
      unit_amount: {
        currency_code: 'USD',
        value: numericPrice.toFixed(2)
      },
      quantity: item.quantity.toString(),
      category: 'PHYSICAL_GOODS',
      sku: item.id || `sku_${item.cartItemId}`
    };
  });

  const formattedTotal = totalAmount.toFixed(2);

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
    
    const response = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { 
            currency_code: 'USD', 
            value: formattedTotal,
            breakdown: {
               item_total: {
                  currency_code: 'USD',
                  value: formattedTotal
               }
            }
          },
          items: mappedItems
        }]
      })
    });
    
    if (!response.ok) {
       const text = await response.text();
       console.error("PayPal Create Order Error Response:", text);
       return res.status(response.status).json({ error: "Failed creating order from PayPal.", details: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Critical server-side PayPal execution error:", error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
}
