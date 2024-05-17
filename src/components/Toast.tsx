import React, { useState } from "react";

export const enum ToastType {
  Warning = "warning",
  Error = "error",
  Success = "success",
  Info = "info",
  Notification = "notification",
}

interface ToastProps {
  title: string;
  type: ToastType;
  onClose?: () => void; // Функция, которая вызывается при закрытии тоста
}

// Компонент Toast
const Toast = (props: ToastProps) => {
  const { title, type, onClose } = props
  // Состояние, управляющее видимостью тоста
  const [isVisible, setIsVisible] = useState(true);

  // Функция, которая закрывает тост
  const handleClose = () => {
    // Скрываем тост
    setIsVisible(false);

    // Вызываем функцию onClose, если она передана
    if (onClose) {
      onClose();
    }
  };

  // Стиль для тоста
  const toastStyle = {
    padding: "10px 15px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    display: "flex",
    alignItems: "center",
    color: "black",
  };

  // Стиль для фона и границы в зависимости от типа тоста
  const typeStyles: {
    backgroundColor: string;
    borderColor: string;
  } = {
    backgroundColor: "transparent",
    borderColor: "transparent",
  };

  // Устанавливаем цвета фона и границы в зависимости от типа тоста
  switch (type) {
    case ToastType.Warning:
      typeStyles.backgroundColor = "#FFF5E5";
      typeStyles.borderColor = "#FFC107";
      break;
    case ToastType.Error:
      typeStyles.backgroundColor = "#FDE8E8";
      typeStyles.borderColor = "#F44336";
      break;
    case ToastType.Success:
      typeStyles.backgroundColor = "#EAF2EF";
      typeStyles.borderColor = "#4CAF50";
      break;
    case ToastType.Info:
      typeStyles.backgroundColor = "#EBF0F5";
      typeStyles.borderColor = "#607D8B";
      break;
    case ToastType.Notification:
      typeStyles.backgroundColor = "#E5F1F9";
      typeStyles.borderColor = "#2196F3";
      break;
  }

  // Функция, которая возвращает иконку в зависимости от типа тоста
  const icon = () => {
    switch (type) {
      case ToastType.Warning:
        return "⚠️";
      case ToastType.Error:
        return "⛔";
      case ToastType.Success:
        return "✅";
      case ToastType.Info:
        return "📖";
      case ToastType.Notification:
        return "🔔";
      default:
        return "⚠️"; // Иконка по умолчанию
    }
  };

  return (
    <div
      style={{
        ...toastStyle, // Базовый стиль тоста
        ...typeStyles, // Стиль, зависящий от типа тоста
        opacity: isVisible ? 1 : 0, // Устанавливаем прозрачность в зависимости от видимости
        transition: "opacity 0.3s ease",
      }}
    >
      <span style={{ marginRight: "10px" }}>{icon()}</span>
      <span>{title}</span>
      <span
        style={{ marginLeft: "auto", marginRight: "5px", cursor: "pointer" }}
        onClick={handleClose} // Обработчик клика на крестик
      >
        ✖
      </span>
    </div>
  );
};

export default Toast;