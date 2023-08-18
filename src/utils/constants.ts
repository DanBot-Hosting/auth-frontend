export interface FooterData  {
    updates: { title: string, link: string }[];
    support: { title: string, link: string }[];
    legal: { title: string, link: string }[];
}

export const footerData: FooterData = {
    updates: [
        {
            title: 'Discord',
            link: 'https://discord.com/invite/dbh'
        },
        {
            title: 'Github',
            link: 'https://github.com/Danbot-Hosting'
        }
    ],
    support: [
        {
            title: 'Contact',
            link: 'https://danbot.host/support'
        },
        {
            title: 'Faq',
            link: 'https://status.danbot.host'
        },
    ],

    legal: [
        {
            title: 'Terms of Service',
            link: 'https://danbot.host/terms'
        },
        {
            title: 'Privacy Policy',
            link: 'https://danbot.host/privacy'
        },
    ]
}