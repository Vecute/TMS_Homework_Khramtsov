import singlePostReducer, { SinglePostState } from '../redux/singlePostReducer';
import { fetchPostById } from '../thunk/fetchPostById';

// Mock для thunk'a fetchPostById - заменяем реальный thunk на мок-функцию, чтобы не выполнять реальные сетевые запросы во время тестов
jest.mock('../thunk/fetchPostById');

// Описываем набор тестов для singlePostSlice
describe('singlePostSlice', () => {
  // Определяем начальное состояние для тестов
  const initialState: SinglePostState = {
    post: null, // Изначально пост не загружен
    loading: false, // Загрузка не выполняется
    error: null, // Ошибок нет
  };

  // Тест для проверки обработки состояния ожидания (pending)
  it('should handle pending state', () => {
    const action = { type: fetchPostById.pending.type }; // Создаем действие pending для thunk'a
    const state = singlePostReducer(initialState, action); // Вызываем редьюсер с начальным состоянием и действием

    // Ожидаем, что состояние будет равно начальному состоянию с loading: true
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  // Тест для проверки обработки успешного завершения (fulfilled)
  it('should handle fulfilled state', () => {
    // Создаем мок-объект поста
    const mockPost = {
      id: 1,
      title: 'Test Post',
      description: 'Test description',
      image: 'test-image.jpg',
      date: '12-13-24',
      text: 'Test Text',
    };
    const action = { type: fetchPostById.fulfilled.type, payload: mockPost }; // Создаем действие fulfilled с мок-постом в payload
    const state = singlePostReducer(initialState, action); // Вызываем редьюсер

    // Ожидаем, что состояние будет равно начальному состоянию с loading: false и загруженным постом
    expect(state).toEqual({
      ...initialState,
      loading: false,
      post: mockPost,
    });
  });

  // Тест для проверки обработки ошибки (rejected)
  it('should handle rejected state', () => {
    const error = new Error('Test error'); // Создаем объект ошибки
    const action = { type: fetchPostById.rejected.type, error: error }; // Создаем действие rejected с ошибкой
    const state = singlePostReducer(initialState, action); // Вызываем редьюсер

    // Ожидаем, что состояние будет равно начальному состоянию с loading: false и сообщением об ошибке
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: error.message,
    });
  });

  // Тест для проверки обработки ошибки с неизвестным сообщением
  it('should handle rejected state with unknown error', () => {
    // Создаем действие rejected с ошибкой, содержащей сообщение
    const action = {
      type: fetchPostById.rejected.type,
      error: { message: 'Some error message' }, 
    };
    const state = singlePostReducer(initialState, action); // Вызываем редьюсер

    // Ожидаем, что состояние будет равно начальному состоянию с loading: false и сообщением об ошибке
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Some error message',
    });
  });
});