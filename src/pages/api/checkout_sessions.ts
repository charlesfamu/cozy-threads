import { CartItem } from '@/context/CartContext';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

interface RequestBody {
  cart: CartItem[];
}

type ResponseData = {
  amountTotal?: number | null;
  clientSecret?: string | null;
  currency?: string | null;
  customerEmail?: string | null | undefined;
  customerName?: string | null;
  error?: string;
  lineItems?: any;
  sessionId?: string;
  status?: string | null;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const { cart }: RequestBody = req.body;

    try {
      const line_items = cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        cancel_url: `${req.headers.origin}/cart`,
        line_items,
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd',
              },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              }
            },
          }
        ],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        // https://docs.stripe.com/payments/checkout/custom-success-page
      });
      res.status(200).json({sessionId: session.id});
    } catch (error: any) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else if (req.method === 'GET') {
    try {
      const sessionId = req.query.session_id;
      if (!sessionId) {
        res.status(404).json({ error: 'Session not found'});
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
        expand: ['line_items', 'customer'],
      });

      const orderDetails = {
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        lineItems: session.line_items,
        status: session.status,
      };

      res.status(200).json(orderDetails);
    } catch (error: any) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}