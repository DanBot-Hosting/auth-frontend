import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Header as MantineHeader,
  Group,
  Image,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Menu,
  rem,
  UnstyledButton,
  Avatar,
  NavLink,
  Title,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@components/colorSchemeToggle';
import { logout } from '@components/auth';
import Link from 'next/link';
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconTool,
  IconSettingsCode,
} from '@tabler/icons-react';
import useStyles from './header.styles';
import { HeaderLinks, NavbarLinks } from '@util/constants';

function UserMenu({ user }: { user: CombinedUser }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, cx } = useStyles();
  const { push } = useRouter();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Avatar src={user.dbUser.avatarURL} alt={user.dbUser.username} radius="xl" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
        </Link>
        <Menu.Item
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => {
            logout();
            push('/');
          }}
        >
          Logout
        </Menu.Item>

        {user.dbUser.roles !== 'USER' && (
          <>
            <Menu.Divider />
            <Menu.Label>Staff Zone</Menu.Label>
            {user.dbUser.roles === 'ADMIN' && (
              <Menu.Item icon={<IconTool size="0.9rem" stroke={1.5} />}>Admin Dashboard</Menu.Item>
            )}

            {user.dbUser.roles === 'DEVELOPER' && (
              <>
                <Menu.Item icon={<IconTool size="0.9rem" stroke={1.5} />}>
                  Admin Dashboard
                </Menu.Item>

                <Menu.Item icon={<IconSettingsCode size="0.9rem" stroke={1.5} />}>
                  Developer Dashboard
                </Menu.Item>
              </>
            )}
          </>
        )}
        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function Header({ user }: { user: CombinedUser }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();

  const headerLinks = HeaderLinks.map((link, i) => (
    <Anchor component="a" key={i} href={link.link} target="_blank" className={classes.link}>
      {' '}
      {link.label}
    </Anchor>
  ));

  const navbarLinks = NavbarLinks.map((item, i) => (
    <NavLink key={i} component="a" href={item.link} label={item.label} />
  ));

  return (
    <Box className={classes.container}>
      <MantineHeader height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />

          <Link href="/" legacyBehavior>
            <Group className={classes.child}>
              <Image alt="DanBot Hosting" radius="sm" src="logo.png" height={50} width={50} />
              <Text sx={{ fontWeight: 500 }} className={classes.hiddenMobile}>
                DanBot Hosting
              </Text>
            </Group>
          </Link>

          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={cx(classes.hiddenMobile, classes.child)}
          >
            {headerLinks}
          </Group>

          <div className={cx(classes.hiddenMobile, classes.child)}>
            <ColorSchemeToggle />
            {user && <UserMenu user={user} />}
          </div>
        </Group>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<Title order={4}>Navigation</Title>}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Title order={5} p="sm">
            General
          </Title>
          {headerLinks}
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Title order={5} p="sm">
            Dashboard
          </Title>
          {navbarLinks}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
