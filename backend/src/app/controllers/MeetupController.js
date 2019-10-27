import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import User from '../models/User';
import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    const MAX_PER_PAGE = 10;
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],

      limit: MAX_PER_PAGE,
      offset: MAX_PER_PAGE * page - MAX_PER_PAGE,
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const MAX_PER_PAGE = 10;
    const { id } = req.params;
    const where = id ? { id } : {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findOne({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: MAX_PER_PAGE,
      offset: MAX_PER_PAGE * page - MAX_PER_PAGE,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(3),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { title, description, location, date, banner } = req.body;

    if (isBefore(date, new Date())) {
      return res
        .status(400)
        .json({ error: "Can't include meetups with past dates." });
    }

    if (req.file) {
      const { originalname, filename: path } = req.file;
      const file = await File.create({ name: originalname, path });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      banner_id: banner || (req.file ? file.id : null),
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(3),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const meetupId = req.params.id;
    const { title, description, location, date, banner } = req.body;

    const meetup = await Meetup.findByPk(meetupId);

    if (!meetup) {
      return res.status(404).json({ error: "Meetup doesn't exists." });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: "Can't update other's meetup." });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update pasted meetups." });
    }

    if (isBefore(date, new Date())) {
      return res
        .status(400)
        .json({ error: "Can't update meetups with past dates." });
    }

    if (req.file) {
      const { originalname, filename: path } = req.file;
      const file = await File.create({ name: originalname, path });

      return res.json(
        await meetup.update({
          title,
          description,
          location,
          date,
          banner: file.id,
          user_id: req.userId,
        })
      );
    }

    const updated = await meetup.update({
      title,
      description,
      location,
      date,
      banner_id: banner,
    });

    return res.json(updated);
  }

  async delete(req, res) {
    const meetupId = req.params.id;
    const meetup = await Meetup.findByPk(meetupId);

    if (!meetup) {
      return res.status(404).json({ error: "Meetup doesn't exists." });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: "Can't cancel other's meetup." });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't cancel pasted meetups." });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
