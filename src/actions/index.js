import { ADD_MEDIA, REMOVE_MEDIA, REORDER_BACKLOG } from '../constants/action-types';

export const addMedia = media => (
    {
        type: ADD_MEDIA,
        payload: media
    }
);

export const removeMedia = media => (
    {
        type: REMOVE_MEDIA,
        payload: media
    }
);

export const reorderBacklog = args => (
    {
        type: REORDER_BACKLOG,
        payload: args
    }
)
