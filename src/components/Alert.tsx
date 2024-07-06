import React, { useEffect, useState } from "react";
import "../styles/Alert.scss";

// Интерфейс для пропсов компонента
interface AlertProps {
  text: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ text, onClose }) => {
  // Состояние для отслеживания анимации закрытия
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => { // Обработчик закрытия алерта
    setIsClosing(true);
    setTimeout(onClose, 1000); // Вызываем onClose через 1000 мс
  };

  // useEffect для автоматического закрытия алерта через 5 секунд
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 1000); // Вызываем onClose через 1000 мс
    }, 5000); // Устанавливаем таймаут на 5000 мс

    return () => clearTimeout(timeoutId); // Очищаем таймаут при размонтировании
  }, [onClose]);

  return (
    <div
      className={`custom-alert ${isClosing ? "hidden" : ""}`}
      onClick={handleClose}
    >
      <p>{text}</p>
      <div className="custom-alert__close-button-wrapper">
        <div
          onClick={handleClose}
          className={`custom-alert__close-button ${isClosing ? "hidden" : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default Alert;