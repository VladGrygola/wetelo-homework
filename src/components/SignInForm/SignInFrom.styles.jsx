import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    alignSelf: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));

export default useStyles;
