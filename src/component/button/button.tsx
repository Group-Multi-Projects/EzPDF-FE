import Cookies from 'js-cookie'

const setSessionIdInCookie = (sessionId: string, expireDays: number = 1) => {
  try {
    // Lưu sessionId vào cookie
    Cookies.set('sessionId', sessionId, { expires: expireDays, path: '/' });
    console.log('Session ID has been set in cookies');
  } catch (error) {
    console.error('Error setting session ID in cookies:', error);
  }
};

export default setSessionIdInCookie;
