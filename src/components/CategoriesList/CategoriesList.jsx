import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Checkbox, Button, TextField, ButtonGroup } from '@material-ui/core';

import useStyles from './CategoriesList.styles';

const CategoriesList = ({
  categories,
  queryResponse,
  setQueryParams,
  queryParams,
  fetchCategoriesRedux,
  user,
}) => {
  const didMountRef = useRef(false);

  const defaultState = {};
  categories.forEach((category) => {
    defaultState[`${category.id}`] = false;
  });

  const [isEditable, setIsEditable] = useState({ ...defaultState });
  const [isSelected, setIsSelected] = useState({ ...defaultState });
  const [isVisibleNewItem, setIsVisibleNewItem] = useState(false);
  const [newItemText, setNewItemText] = useState('');

  const { page, limit, orderBy, order, q } = queryParams;

  const classes = useStyles();

  useEffect(() => {
    if (didMountRef.current) {
      fetchCategoriesRedux(user.token, { page, limit, order, orderBy, q });
    } else didMountRef.current = true;
  }, [page, limit, order, orderBy, q]);

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
  const handleDeleteClick = ({ target }) => {};
  const handleUpdateClick = ({ target }) => {};
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
          <Button>
            <DeleteIcon />
          </Button>
        </div>
      </div>
      <ul className={classes.ul}>
        {categories.map((categoty) => (
          <li key={categoty.id} className={classes.li}>
            <Checkbox
              checked={isSelected[categoty.id]}
              id={categoty.id.toString()}
              onClick={handleCheckboxClick}
            />
            {isEditable[categoty.id] ? (
              <TextField defaultValue={categoty.title} />
            ) : (
              <span>
                <span>
                  {categoty.title}
                  &nbsp;
                </span>
                <span className={classes.id}>#{categoty.id}</span>
              </span>
            )}

            <span className={classes.tools}>
              {isEditable[categoty.id] && (
                <>
                  <Button
                    className={classes.button}
                    id={categoty.id}
                    onClick={handleUpdateClick}
                    component={CheckIcon}
                  />
                  <Button
                    className={classes.button}
                    id={categoty.id}
                    onClick={handleExitEditClick}
                    component={CloseIcon}
                  />
                </>
              )}

              <Button
                className={classes.button}
                id={categoty.id}
                onClick={handleEditClick}
                component={EditIcon}
              />
              <Button
                className={classes.button}
                id={categoty.id}
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
            onClick={() => setIsVisibleNewItem(false)}
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
            onClick={({ target: { value } }) =>
              setQueryParams({ ...queryParams, page: page - 1 })
            }
          >
            <ArrowBackIosIcon />
          </Button>
          <Button disabled>{page}</Button>
          <Button
            disabled={queryResponse.lastPage === page}
            onClick={({ target: { value } }) =>
              setQueryParams({ ...queryParams, page: page + 1 })
            }
          >
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CategoriesList;
