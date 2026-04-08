import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.error('[Stripe SDK] FATAL: STRIPE_SECRET_KEY environment variable is missing.');
      return res.status(500).json({
        error: 'Checkout configuration error on server. STRIPE_SECRET_KEY is required.'
      });
    }

    const stripe = new Stripe(secretKey);

    const { items, origin } = req.body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Invalid request. No cart items were provided.'
      });
    }

    const safeOrigin =
      origin ||
      req.headers.origin ||
      'https://1666newark.com';

    const lineItems = items.map((item) => {
      let numericPrice;

      if (typeof item.price === 'number') {
        numericPrice = item.price;
      } else if (typeof item.price === 'string') {
        numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      } else {
        numericPrice = NaN;
      }

      if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        throw new Error(`Invalid price for item: ${item.name}`);
      }

      const productData = {
        name: `${item.name || 'Product'}${item.size ? ` (${item.size}` : ''}${item.color ? `${item.size ? ' - ' : ' ('}${item.color}` : ''}${item.size || item.color ? ')' : ''}`,
      };

      if (item.image) {
        const imageUrl = item.image.startsWith('http')
          ? item.image
          : `${safeOrigin}${item.image}`;
        productData.images = [imageUrl];
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: Math.round(numericPrice * 100),
        },
        quantity: Number(item.quantity) || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${safeOrigin}/success`,
      cancel_url: `${safeOrigin}/cart`,
    });

    return res.status(200).json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('[Stripe Checkout Error]', error);
    return res.status(500).json({
      error: 'Failed to create stripe session',
      details: error.message,
    });
  }
}