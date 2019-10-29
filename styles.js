import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  input: {
    width: '70%'
  },
  root: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    border: '1px solid rgba(0, 0, 0, 0.54)',
    padding: 16,
    position: 'absolute',
    top: 150,
    width: 200,
    zIndex: 10
  },
  child: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: '100%',
    top: 0,
    width: 200,
	  border: '1px solid black'
  },
  title: {
    fontSize: 14,
    margin: '20px 0'
  },
  divider: {
    marginBottom: 8
  },
  buttonGroup: {
    float: 'right'
  }
}));