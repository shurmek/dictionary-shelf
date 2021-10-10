import {
  NotificationInterface,
  notificationActionTypes,
  NOTIFICATION_SHOW_ACTION
} from '../reducers/notification.reducer'

/**
 * @param message - displayed text in notification;
 * 
 * @return notification action with notification type is "warning" as default
 */
function notificationShow(message: string): NOTIFICATION_SHOW_ACTION;

/**
 * 
 * @param message displayed text in notification
 * @param type notification type from {@link [Notistack](https://iamhosseindhv.com/notistack/demos#variants)}
 * 
 * @return notification action
 */
function notificationShow(message: string, type: NotificationInterface["type"]): NOTIFICATION_SHOW_ACTION;

function notificationShow(message: string, type?: NotificationInterface["type"]) {
  return ({
    type: notificationActionTypes.NOTIFICATION_SHOW,
    payload: {
      message,
      type: type ?? "warning"
    }
  })
};

export { notificationShow }