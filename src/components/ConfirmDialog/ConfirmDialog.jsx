import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='confirm-dialog'
    >
      <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => setOpen(false)}
          color='secondary'
        >
          No
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color='default'
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.instanceOf(Object),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDialog;
