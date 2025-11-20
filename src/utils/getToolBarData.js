import { toolBarData } from "../data/toolBarData";
import { toolBarData as toolBarData_student } from "../data/toolBarData_student";
import { toolBarData as toolBarData_tutor } from "../data/toolBarData_Totre";

/**
 * Get the appropriate toolbar data based on user type
 * @returns {Array} The toolbar data for the current user
 */
export const getToolBarData = () => {
  const userType = localStorage.getItem('userType');
  
  if (userType === 'admin') {
    return toolBarData;
  } else if (userType === 'tutor') {
    return toolBarData_tutor;
  } else if (userType === 'student') {
    return toolBarData_student;
  }
  
  // Default to student toolbar if user type is not determined
  return toolBarData_student;
};

