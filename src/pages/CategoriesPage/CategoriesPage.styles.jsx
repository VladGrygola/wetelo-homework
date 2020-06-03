import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  categoriesTable: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    maxWidth: '780px',
  },
  title: {
    padding: theme.spacing(3),
  },
}));

export default useStyles;
