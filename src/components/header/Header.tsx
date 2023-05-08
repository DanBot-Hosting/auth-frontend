import { useState } from 'react';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@components/colorSchemeToggle';
import Link from 'next/link';
import {
  IconLogout,
  IconSettings,
  IconTrash,
  IconTool,
  IconSettingsCode,
} from '@tabler/icons-react';
import useStyles from './header.styles';
import type { CombinedUser } from '@util/types/common';

function UserMenu({ user }: { user: CombinedUser }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, cx } = useStyles();

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
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
        <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

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
            <a href="https://danbot.host" target="_blank" className={classes.link}>
              Website
            </a>
            <a href="https://panel.danbot.host" target="_blank" className={classes.link}>
              Panel
            </a>
            <a href="https://discord.com/invite/dbh" target="_blank" className={classes.link}>
              Discord
            </a>
          </Group>

          <div className={cx(classes.hiddenMobile, classes.child)}>
            <ColorSchemeToggle />
          </div>

          {user && (
            <div className={classes.child}>
              <UserMenu user={user} />
            </div>
          )}
        </Group>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="https://danbot.host" target="_blank" className={classes.link}>
            Website
          </a>
          <a href="https://panel.danbot.host" target="_blank" className={classes.link}>
            Panel
          </a>
          <a href="https://discord.com/invite/dbh" target="_blank" className={classes.link}>
            Discord
          </a>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
