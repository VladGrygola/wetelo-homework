import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  tools: {
    marginLeft: 'auto',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '0',
    fontWeight: '500',
  },
  button: {
    height: '36px',
  },
  order: {
    minWidth: '120px',
  },
  orderBy: {
    minWidth: '70px',
  },
  ul: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '0',
    marginBottom: '0',
  },
  li: {
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  id: {
    color: 'lightgrey',
  },
  pageTools: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
  },
  queryInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newItemDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing(1),
    paddingBottom: spacing(2),
  },
  newCategoryInput: {
    marginLeft: spacing(2),
    width: '100%',
  },
  newCategoryLabel: {
    width: '158px',
  },
}));

export default useStyles;
