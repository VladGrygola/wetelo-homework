import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  SignUpContainer: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: theme.spacing(5),
    flexGrow: 0.7,
  },
  SignInLinkContainer: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    flexGrow: 0,
  },
}));

export default useStyles;
