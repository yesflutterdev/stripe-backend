const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Use body or fallback to query parameters
      const { amount, currency = 'usd', accountId } = req.body.amount
        ? req.body
        : req.query;

      // Convert amount to an integer
      const parsedAmount = parseInt(amount, 10);
      if (isNaN(parsedAmount)) {
        throw new Error('Invalid amount: must be a number');
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: parsedAmount * 100, // Convert to cents
        currency,
        payment_method_types: ['card'],
        transfer_data: {
          destination: accountId, // Connected account ID
        },
      });

      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
