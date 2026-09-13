import {Router} from 'express';
import { z } from 'zod';
import Order, { ORDER_STATUS } from '../models/Order.js';
import { auth, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { ah } from '../middleware/errorHandler.js';
import { adminRouter as categoriesAdmin } from './categories.js';
import { adminRouter as productsAdmin } from './products.js';

const router = Router();
router.use(auth, requireAdmin);

router.use('/categories', categoriesAdmin);
router.use('/products', productsAdmin);

router.get(
  '/orders',
  ah(async (_req, res) => {
    const data = await Order.find().sort('-createdAt').populate('user', 'email firstName lastName');
    res.json({ data, total: data.length });
  })
);

const statusSchema = z.object({
  status: z.enum(ORDER_STATUS),
  trackingNumber: z.string().optional(),
});

router.put(
  '/orders/:id/status',
  validate(statusSchema),
  ah(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status;
    if (req.body.trackingNumber !== undefined) order.trackingNumber = req.body.trackingNumber;
    await order.save();
    res.json(order);
  })
);

export default router;