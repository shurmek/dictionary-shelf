import { VariantType } from 'notistack';
import { Reducer, Action } from 'redux';

/** Notification interface */
export interface NotificationInterface {
  message: string,
  type: VariantType
};

/** Notification action types */
export enum notificationActionTypes {
  /** notificaiton show */
  NOTIFICATION_SHOW = 'notification/show'
};

/** Notification show action interface */
export interface NOTIFICATION_SHOW_ACTION
  extends Action<notificationActionTypes.NOTIFICATION_SHOW> {
  payload: NotificationInterface
};

/** Notification action overloaded type */
export type NotificationAction = NOTIFICATION_SHOW_ACTION;

/** Notifiaction state interface */
export type NotificationState = NotificationInterface | null;

/** Notification initial state */
const initialState = null;

/** Notification reducer */
export const notifiactionReducer: Reducer<NotificationState, NotificationAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case notificationActionTypes.NOTIFICATION_SHOW:
        return action.payload
      default:
        return state
    }
  };