import { toolBarData as toolBarData_admin } from "../data/toolBarData_Admin";
import { toolBarData as toolBarData_student } from "../data/toolBarData_student";
import { toolBarData as toolBarData_tutor } from "../data/toolBarData_Tutor";


export const getToolBarData = () => {
  const userType = localStorage.getItem('userType');
  
  if (userType === 'admin') {
    return toolBarData_admin;
  } else if (userType === 'tutor') {
    return toolBarData_tutor;
  } else if (userType === 'student') {
    return toolBarData_student;
  }
};

