const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, currency = 'usd', accountId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
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
    // Reject methods other than POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
