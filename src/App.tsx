import React from 'react';
import './App.scss';
import Title, { TitlesLevels, TitlesSizes } from './components/Title'
import Hamburger from './components/Hamburger'
import Toast, {ToastType} from "./components/Toast";

function App() {
  return (
    <div className="App">
      <Title level={TitlesLevels.extraSmall} size={TitlesSizes.extraSmall} title='Extra small title' />
      <Title level={TitlesLevels.small} size={TitlesSizes.small} title='Small title' />
      <Title level={TitlesLevels.medium} size={TitlesSizes.medium} title='Medium title' />
      <Title level={TitlesLevels.large} size={TitlesSizes.large} title='Large title' />
      <Title level={TitlesLevels.extraLarge} size={TitlesSizes.extraLarge} title='Extra large title' />
      <Title level={TitlesLevels.superLarge} size={TitlesSizes.superLarge} title='Super large title' />
      <Hamburger/>
      <Toast title="Ошибка загрузки данных" type={ToastType.Error}/>
      <Toast title="Успешная отправка формы" type={ToastType.Success}/>
      <Toast title="Новое уведомление" type={ToastType.Notification}/>
      <Toast title="Это информационное сообщение" type={ToastType.Info}/>
      <Toast title="Внимание. Проверьте информацию" type={ToastType.Warning}/>
    </div>
  );
}

export default App;
