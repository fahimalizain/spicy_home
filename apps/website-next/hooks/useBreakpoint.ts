import { useMediaQuery } from 'react-responsive';

// import resolveConfig from 'tailwindcss/resolveConfig';
// import tailwindConfig from '../tailwind.config';
// const config = resolveConfig(tailwindConfig);
// const breakpoints = config.theme.screens;

const breakpoints = {
  sm: '640px',

  md: '768px',

  lg: '1024px',

  xl: '1280px',

  '2xl': '1536px',
};

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
