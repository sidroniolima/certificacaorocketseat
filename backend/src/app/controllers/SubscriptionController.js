import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Queue from '../../lib/Queue';

import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
          ],
          where: {
            date: {
              [Op.gte]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [['meetup', 'date', 'DESC']],
    });

    return res.json(subscriptions);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res
        .status(404)
        .json({ error: 'You are not subscripted to this meetup.' });
    }

    await subscription.destroy();

    return res.send();
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    const alreadySubscripted = await Subscription.findOne({
      where: { user_id: user.id, meetup_id: meetup.id },
    });

    const sameHour = await Subscription.findOne({
      where: { user_id: user.id },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (!meetup) {
      return res.status(404).json({ error: "Meetup doesn't exists." });
    }

    if (meetup.user_id === user.id) {
      return res.status(401).json({ error: "Can't subscript to your meetup." });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "Can't subscript to pasted meetups." });
    }

    if (alreadySubscripted) {
      return res
        .status(400)
        .json({ error: 'Already subscripted to this meetup.' });
    }

    if (sameHour) {
      return res
        .status(400)
        .json({ error: 'Already subscripted to this date/time.' });
    }

    const subs = await Subscription.create({
      meetup_id: meetup.id,
      user_id: user.id,
    });

    await Queue.add(SubscriptionMail.key, {
      subscriptorName: user.name,
      subscriptorEmail: user.email,
      meetupTitle: meetup.title,
      meetupCreator: meetup.user.name,
    });

    return res.json(subs);
  }
}

export default new SubscriptionController();
