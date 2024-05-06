export interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  model3d: string;
}

export const items: Item[] = [
  {
    id: '1',
    title: 'Guitar',
    description:
      'A guitar is a string instrument that produces a distinctive sound.',
    image:
      'https://developer.apple.com/augmented-reality/quick-look/models/stratocaster/stratocaster_2x.jpg',
    model3d:
      'https://developer.apple.com/augmented-reality/quick-look/models/stratocaster/fender_stratocaster.usdz',
  },
  {
    id: '2',
    title: 'Chair',
    description:
      'A chair is a piece of furniture with a raised surface supported by legs.',
    image:
      'https://developer.apple.com/augmented-reality/quick-look/models/redchair/redchair_2x.jpg',
    model3d:
      'https://developer.apple.com/augmented-reality/quick-look/models/redchair/chair_swan.usdz',
  },
  {
    id: '3',
    title: 'Retro TV',
    description:
      'A retro TV is a television set that uses a cathode ray tube to display images.',
    image:
      'https://developer.apple.com/augmented-reality/quick-look/models/retrotv/retrotv_2x.jpg',
    model3d:
      'https://developer.apple.com/augmented-reality/quick-look/models/retrotv/tv_retro.usdz',
  },
  {
    id: '4',
    title: 'Gramophone',
    description:
      'A gramophone is a device used to play music from a vinyl record.',
    image:
      'https://developer.apple.com/augmented-reality/quick-look/models/gramophone/gramophone_2x.jpg',
    model3d:
      'https://developer.apple.com/augmented-reality/quick-look/models/gramophone/gramophone.usdz',
  },
  {
    id: '5',
    title: 'Shoe',
    description:
      'A shoe is a piece of footwear that protects the foot and provides comfort.',
    image:
      'https://developer.apple.com/augmented-reality/quick-look/models/nike-pegasus/nike-pegasus_2x.png',
    model3d:
      'https://developer.apple.com/augmented-reality/quick-look/models/nike-pegasus/sneaker_pegasustrail.usdz',
  },
];
