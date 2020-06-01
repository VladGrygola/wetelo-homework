import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  title: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: `${spacing(1)}px !important`,
  },
}));

export default useStyles;
