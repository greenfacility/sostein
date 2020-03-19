import { Activity, Gitlab, Pocket, Server } from 'react-feather';

export default [
  {
    icon: <Pocket size={64} strokeWidth={0.5} />,
    title: 'Standard Licence',
    subtitle: 'Test account',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 0,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '1 user'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <Server size={64} strokeWidth={0.5} />,
    title: 'Basic License',
    subtitle: 'Freelancer',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 2,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '2 users'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <Activity size={64} strokeWidth={0.5} />,
    title: 'Managed License',
    subtitle: 'Small business',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 5,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '3 users'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <Gitlab size={64} strokeWidth={0.5} />,
    title: 'Extended License',
    subtitle: 'Corporate',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 10,
    features: [
      {
        title: 'Secure'
      },
      {
        title: 'Unlimited'
      },
      {
        title: 'Analytics'
      }
    ]
  }
];
