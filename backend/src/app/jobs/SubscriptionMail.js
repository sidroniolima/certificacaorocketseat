import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    await Mail.sendMail({
      to: `${data.subscriptorName} <${data.subscriptorEmail}>`,
      subject: `Subscrição ao meetup ${data.meetupTitle}`,
      template: 'subscription',
      context: {
        creator: data.meetupCreator,
        subscriptor: data.subscriptorName,
        meetup: data.meetupTitle,
      },
    });
  }
}

export default new SubscriptionMail();
