import { lime } from '@mui/material/colors';

const baseTheme = {
  primary: {
    main: lime[50],
  },
};

const getTheme = (mode) => ({
  palette: {
    ...baseTheme,
    mode,
    ...(mode === 'light'
      ? {
        }
      : { 
        }),
  },
});

export default getTheme;
