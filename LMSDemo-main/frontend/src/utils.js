export const isAdmin = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'admin'
    } catch (error) {
        return false;
    }
};