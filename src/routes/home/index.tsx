import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { TodoList } from '../../components/todo-list';
import { Modal, ModalContent } from '../../components/modal';
import { RootState } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';

import styles from './Home.module.css';
import { labels } from '../../constants';
import { getDedline } from '../../utils/getDedline';
import { addActiveItem } from '../../redux/active-todos-slice';
import { Todo } from '../../types/todo';

export const Home: FC = () => {
  const activeTodos = useSelector((state: RootState) => state.activeTodos);
  const dispatch = useDispatch();

  const [isPortalShown, setIsPortalShown] = useState(false);

  const id = uuidv4();
  const handleButtonClick = () => {
    setIsPortalShown(state => !state);
  };

  const handleSave = (data: Omit<Todo, 'id'>) => {
    dispatch(addActiveItem({ ...data, id }));
  };

  return (
    <div className="container">
      <h1 className="title">Todo list</h1>
      <TodoList list={activeTodos} listType={'active'} />
      <div className={styles.buttonWrapper}>
        <button type="button" className={styles.button} onClick={handleButtonClick}>
          Add item
        </button>
      </div>
      {isPortalShown &&
        createPortal(
          <Modal onCloseModal={handleButtonClick}>
            <ModalContent
              description=""
              dedline={getDedline()}
              label={labels.current}
              onCloseModal={handleButtonClick}
              onSaveItem={handleSave}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
};
