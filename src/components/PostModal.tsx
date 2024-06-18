import '../styles/Modal.scss';
import { useDispatch, useSelector } from "react-redux"
import { PostCard } from "./PostCard"
import { Fragment, useEffect } from 'react';
import { setSelectedPost } from '../redux/postPopUpReducer';
import { RootState } from '../redux/store';

export const PostModal = () => {
    const { selectedPost } = useSelector((state: RootState) => state.postPopUpReducer) // Использование useSelector для получения selectedPost из хранилища Redux
    const dispatch = useDispatch() // Использование useDispatch для создания функции dispatch

    // useEffect, который запрещает прокрутку страницы, когда модальное окно открыто
    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedPost]);

    // Функция handleClose, которая закрывает модальное окно, устанавливая selectedPost в null
    const handleClose = () => {
        dispatch(setSelectedPost(null)); 
    }

    // useEffect, который добавляет слушатель событий на клик вне модального окна
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const modal = document.querySelector('.modal');
            if (modal && !modal.contains(event.target as Node)) {
                handleClose();
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Fragment>
            {selectedPost && (
                <div className='modal__wrapper'>
                    <div className="modal">
                        <div className="modal__button-wrapper" onClick={handleClose}>
                            <div className="modal__button">
                            </div>
                        </div>
                        <PostCard  {...selectedPost} />
                    </div>
                </div>
            )}
        </Fragment>
    )
}