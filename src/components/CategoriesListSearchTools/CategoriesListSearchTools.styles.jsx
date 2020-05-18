import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  toolbar: {
    display: 'flex',
    flexFlow: 'row wrap',
    paddingBottom: spacing(2),
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing(5),
  },
  toolbarTools: {
    display: 'flex',
    flexfLOW: 'row wrap',
    flexGrow: '1',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  tools: {
    marginLeft: 'auto',
  },
  order: {
    minWidth: '120px',
  },
  orderBy: {
    minWidth: '70px',
  },
  id: {
    color: 'lightgrey',
  },
}));

export default useStyles;
