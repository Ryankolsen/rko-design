interface StoreLink {
  platform: 'ios' | 'android'
  url: string
}

interface Project {
  href: string
  navLabel: string
  imageSrc: string
  imageAlt: string
  tagVariant: 'plain' | 'game'
  tags: string[]
  title: string
  description: string
  storeLinks: StoreLink[]
}

export const projects: Project[] = [
  {
    href: '/bourbon-dojo',
    navLabel: 'Bourbon Dojo',
    imageSrc: '/bourbon-card.png',
    imageAlt: 'BourbonVault',
    tagVariant: 'plain',
    tags: ['Collection Tracker', 'Belt Progression', 'iOS & Android', '18+', 'Free', 'Available Now'],
    title: 'Bourbon Dojo',
    description:
      'Track, rate, and explore your bourbon collection. Level up through belts as you taste and discover. Built for the enthusiast who takes their pour seriously.',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/us/app/bourbon-dojo/id6762319810' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.ryankolsen.bourbondojo&hl=en_US' },
    ],
  },
  {
    href: '/wizard-kittenz',
    navLabel: 'Wizard Kittenz',
    imageSrc: '/wizard-kittenz-card.png',
    imageAlt: 'Wizard Kittenz',
    tagVariant: 'game',
    tags: ['Dungeon Crawler', 'Multiplayer', 'Achievements', 'iOS & Android', '18+', 'Available Now'],
    title: 'Wizard Kittenz',
    description:
      'Cats. Magic. Chaos. A fantasy adventure game built with Godot where imagination runs wild and kittens rule the realm.',
    storeLinks: [
      { platform: 'ios', url: 'https://apps.apple.com/gb/app/wizard-kittenz/id6788580194' },
      { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.wizardkittenz.game' },
    ],
  },
  {
    href: '/panda-jump',
    navLabel: 'Panda Jump',
    imageSrc: '/panda-jump-card.png',
    imageAlt: 'Panda Jump',
    tagVariant: 'game',
    tags: ['Arcade Jumper', 'Endless Runner', 'Android', 'Coming Soon', 'Free'],
    title: 'Panda Jump',
    description:
      'Leap over barrels and bounce through a hand-crafted bamboo forest in this endless arcade jumper. Simple to pick up, tricky to master — how high can your panda climb?',
    storeLinks: [],
  },
]
