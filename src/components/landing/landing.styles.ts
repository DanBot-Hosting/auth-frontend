import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 50,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 50,
    },
  },

  cookieAlert: {
    position: 'fixed',
    bottom: '1rem',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '350px',
    },
  },
}));
