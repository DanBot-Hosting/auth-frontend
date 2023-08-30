interface UseNotificationProps {
  closeAfter?: number;
}

interface UseNotification {
  show: (props: NotificationProps & UseNotificationProps) => void;
  hide: () => void;
}
