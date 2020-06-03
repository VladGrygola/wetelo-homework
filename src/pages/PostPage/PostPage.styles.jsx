import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    paddingTop: spacing(3),
  },
  content: {
    minHeight: 'calc(100vh - 88px)',
  },
}));

export default useStyles;
