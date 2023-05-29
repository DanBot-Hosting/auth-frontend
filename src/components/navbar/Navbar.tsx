import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Avatar, Divider, Group, Navbar as MantineNavbar, NavLink, Text } from "@mantine/core";
import { NavbarLinks } from "@util/constants";

export function Navbar({ user }: { user: CombinedUser}) {
    const { pathname } = useRouter();
    const [active, setActive] = useState(pathname);

    const links = NavbarLinks.map((item) => (
        <NavLink key={item.label} label={item.label} active={item.link === active} onClick={() => setActive(item.link)} icon={<item.icon size="1rem" stroke={1.5} />} />
    ));

    return (
        <MantineNavbar p="md" width={{ base: 300 }}>
            <MantineNavbar.Section>
                <Group position="apart">
                    <Avatar src={user.dbUser.avatarURL} alt={user.dbUser.username} />
                    <Text weight={500}>{user.dbUser.username}</Text>
                </Group>

                <Divider mt="md"/>

                <MantineNavbar.Section mt="md">
                    {links}
                </MantineNavbar.Section>
            </MantineNavbar.Section>
        </MantineNavbar>
    )
}