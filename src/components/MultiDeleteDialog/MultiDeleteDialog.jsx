import React from 'react';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const MultiDeleteDialog = ({
  isOpen,
  setIsOpen,
  idsOfSelectedPosts,
  userToken,
  deletePosts,
  setDeletingMode,
}) => {
  const handleConfirm = () => {
    deletePosts(userToken, idsOfSelectedPosts);
    setIsOpen(false);
    setDeletingMode(false);
  };
  return (
    <ConfirmDialog
      open={isOpen}
      setOpen={setIsOpen}
      onConfirm={handleConfirm}
      title='Deleting'
    >
      <span>Are you shure you want to delete selected posts?</span>
    </ConfirmDialog>
  );
};

export default MultiDeleteDialog;
