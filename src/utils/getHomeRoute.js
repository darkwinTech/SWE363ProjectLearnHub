/**
 * Get the home route based on the current user type
 * This function checks localStorage or the current path to determine user type
 * @returns {string} The home route for the current user
 */
export const getHomeRoute = () => {
  // Check if user type is stored in localStorage
  const userType = localStorage.getItem('userType');
  
  if (userType) {
    switch (userType) {
      case 'admin':
        return '/admin';
      case 'tutor':
        return '/tutor';
      case 'student':
        return '/student';
      default:
        // If userType exists but doesn't match, redirect to login
        return '/';
    }
  }
  
  // Fallback: check current pathname
  const pathname = window.location.pathname;
  if (pathname.includes('/admin')) {
    return '/admin';
  } else if (pathname.includes('/tutor')) {
    return '/tutor';
  } else if (pathname.includes('/student')) {
    return '/student';
  }
  
  // No default - redirect to login if user type cannot be determined
  return '/';
};

