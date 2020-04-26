import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Checkbox, Button, TextField, ButtonGroup } from '@material-ui/core';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

import useStyles from './CategoriesList.styles';

const CategoriesList = ({
  categories,
  queryResponse,
  setQueryParams,
  queryParams,
  userToken,
  fetchCategoriesRedux,
  addCategoryRedux,
  deleteCategoryRedux,
  updateCategoryRedux,
  deleteCategoriesRedux,
}) => {
  const didMountRef = useRef(false);

  const defaultState = {};
  categories.forEach((category) => {
    defaultState[`${category.id}`] = false;
  });
  const inputDefaultState = {};
  categories.forEach((category) => {
    inputDefaultState[`${category.id}`] = category.title;
  });

  const [isEditable, setIsEditable] = useState({ ...defaultState });
  const [isSelected, setIsSelected] = useState({ ...defaultState });
  const [updateFieldInput, setUpdateFieldInput] = useState({
    ...inputDefaultState,
  });
  const [isVisibleNewItem, setIsVisibleNewItem] = useState(false);
  const [
    isVisibleMultipleDeleteDialog,
    setIsVisibleMultipleDeleteDialog,
  ] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    visible: false,
    id: -1,
  });
  const [newItemText, setNewItemText] = useState('');

  const { page, limit, orderBy, order, q } = queryParams;

  const classes = useStyles();

  useEffect(() => {
    if (didMountRef.current) {
      fetchCategoriesRedux(userToken, { page, limit, order, orderBy, q });
    } else didMountRef.current = true;
  }, [page, limit, order, orderBy, q, userToken, fetchCategoriesRedux]);

  const handleCheckboxClick = ({ target }) => {
    const temp = { ...isSelected };
    temp[target.id] = !isSelected[target.id];
    setIsSelected({ ...temp });
  };
  const handleEditClick = ({ target }) => {
    setIsEditable({ ...isEditable, [target.id]: true });
  };
  const handleExitEditClick = ({ target }) => {
    setIsEditable({ ...isEditable, [target.id]: false });
  };
  const handleDeleteClick = ({ target }) => {
    setDeleteDialog({ visible: true, id: target.id });
  };
  const handleUpdateFieldInput = ({ target }) => {
    setUpdateFieldInput({ ...updateFieldInput, [target.id]: target.value });
  };
  const handleUpdateClick = ({ target }) => {
    const categoryToUpdate = categories.find(
      (category) => parseInt(category.id, 10) === parseInt(target.id, 10)
    );
    categoryToUpdate.title = updateFieldInput[categoryToUpdate.id];
    updateCategoryRedux(userToken, categoryToUpdate);
  };
  const handleAddCategory = () => addCategoryRedux(userToken, newItemText);
  return (
    <div>
      <div className={classes.queryInfo}>
        <span className={classes.total}>
          <Checkbox
            onClick={({ target }) => {
              const temp = { ...isSelected };
              Object.keys(temp).forEach((v) => {
                temp[v] = target.checked;
              });
              setIsSelected(temp);
            }}
          />
          Total:
          {queryResponse.total}
        </span>
        <div>
          <Button
            className={classes.button}
            component={AddIcon}
            onClick={() => setIsVisibleNewItem(true)}
          />
          <Button
            className={classes.button}
            component={DeleteIcon}
            onClick={() =>
              Object.values(isSelected).some((v) => v)
                ? setIsVisibleMultipleDeleteDialog(true)
                : alert('Nothing to delete')
            }
          />
        </div>
      </div>
      <ul className={classes.ul}>
        {categories.map((category) => (
          <li key={category.id} className={classes.li}>
            <Checkbox
              checked={isSelected[category.id]}
              id={category.id.toString()}
              onClick={handleCheckboxClick}
            />
            {isEditable[category.id] ? (
              <TextField
                id={category.id}
                value={updateFieldInput[category.id]}
                onChange={handleUpdateFieldInput}
              />
            ) : (
              <span>
                <span>
                  {category.title}
                  &nbsp;
                </span>
                <span className={classes.id}>#{category.id}</span>
              </span>
            )}

            <span className={classes.tools}>
              {isEditable[category.id] && (
                <>
                  <Button
                    className={classes.button}
                    id={category.id}
                    onClick={handleUpdateClick}
                    component={CheckIcon}
                  />
                  <Button
                    className={classes.button}
                    id={category.id}
                    onClick={handleExitEditClick}
                    component={CloseIcon}
                  />
                </>
              )}

              <Button
                className={classes.button}
                id={category.id}
                onClick={handleEditClick}
                component={EditIcon}
              />
              <Button
                className={classes.button}
                id={category.id}
                onClick={handleDeleteClick}
                component={DeleteIcon}
              />
            </span>
          </li>
        ))}
      </ul>
      {isVisibleNewItem && (
        <div className={classes.newItemDiv}>
          <AddIcon color='disabled' />
          <span className={classes.newCategoryLabel}>&nbsp;New category</span>
          <TextField
            className={classes.newCategoryInput}
            value={newItemText}
            onChange={({ target }) => setNewItemText(target.value)}
          />
          <Button
            className={classes.button}
            component={CloseIcon}
            onClick={() => setIsVisibleNewItem(false)}
          />
          <Button
            className={classes.button}
            component={CheckIcon}
            onClick={handleAddCategory}
          />
        </div>
      )}
      <div className={classes.pageTools}>
        <ButtonGroup
          variant='text'
          color='primary'
          aria-label='text primary button group'
        >
          <Button
            disabled={page === 1}
            onClick={() => setQueryParams({ ...queryParams, page: page - 1 })}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button disabled>{page}</Button>
          <Button
            disabled={queryResponse.lastPage === page}
            onClick={() => setQueryParams({ ...queryParams, page: page + 1 })}
          >
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
      </div>
      <ConfirmDialog
        title='Deleting category'
        open={deleteDialog.visible}
        setOpen={(v) => setDeleteDialog({ ...deleteDialog, visible: v })}
        onConfirm={() => deleteCategoryRedux(userToken, deleteDialog.id)}
      >
        <span>Are you shure you want to delete this category?</span>
      </ConfirmDialog>
      <ConfirmDialog
        title='Deleting categories'
        open={isVisibleMultipleDeleteDialog}
        setOpen={setIsVisibleMultipleDeleteDialog}
        onConfirm={() => {
          const ids = [];
          Object.entries(isSelected).forEach(
            (en) => en[1] && ids.push(parseInt(en[0], 10))
          );
          deleteCategoriesRedux(userToken, ids);
        }}
      >
        <span>
          Are you shure you want to delete categories with id:&nbsp;
          {Object.entries(isSelected).map((en) => en[1] && `#${en[0]}, `)}
        </span>
      </ConfirmDialog>
    </div>
  );
};

export default CategoriesList;
