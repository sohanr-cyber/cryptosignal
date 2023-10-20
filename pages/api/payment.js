
import nc from "next-connect";
import coinbase from "coinbase-commerce-node";
let Client = coinbase.Client;
Client.init(process.env.API_KEY);
let Charge = coinbase.resources.Charge;
const handler = nc();



handler.post(async (req, res) => {
  const { amount, currency, name, description } = req.body;
  const resources = coinbase.resources;

  try {
    const charge = await resources.Charge.create({
      name,
      description,
      local_price: {
        amount: amount,
        currency: currency,
      },
      pricing_type: "fixed_price",
      metadata: {
        user_id: "3434",
      },
    });
    res.status(200).send(charge.hosted_url);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default handler;
