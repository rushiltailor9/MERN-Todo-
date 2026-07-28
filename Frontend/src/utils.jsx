import { toast } from 'react-toastify';

export const API_URL = 'http://localhost:8080';

export const notify = (message, type = 'success') => {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'error') {
        toast.error(message);
    } else {
        toast.info(message);
    }
};