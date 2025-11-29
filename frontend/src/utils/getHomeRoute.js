export const getHomeRoute = () => {
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
        return '/';
    }
  }
  
  const pathname = window.location.pathname;
  if (pathname.includes('/admin')) {
    return '/admin';
  } else if (pathname.includes('/tutor')) {
    return '/tutor';
  } else if (pathname.includes('/student')) {
    return '/student';
  }
  
  return '/';
};

