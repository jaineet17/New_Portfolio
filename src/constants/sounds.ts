export const SOUND_PATHS = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  transition: '/sounds/transition.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
} as const;

export type SoundName = keyof typeof SOUND_PATHS; 