import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    color: 'white',
  },
  image: {
    minWidth: '100%',
    maxHeight: '100%',
    flexGrow: 1,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover  ',
  },
  info: {
    margin: spacing(1),
    fontWeight: '200',
  },
  title: {
    margin: spacing(1),
    fontWeight: '600',
    color: 'white',
    textDecoration: 'none',
  },
}));

export default useStyles;
