# Learn Hub
## Description:
Learn Hub is a university-based initiative designed to enhance and modernize the peer 
tutoring experience. The project aims to connect students who are capable of offering 
academic support with those who need assistance in specific courses, creating a 
structured and accessible system for learning.
Instead of relying on informal or unstructured methods, the platform provides a unified space where learners can:
- Find academic support.
- Explore tutor profiles.
- Schedule tutoring sessions that match their academic needs and availability.
  
Key Features:
- Course-Based Search: Easily find tutors and sessions by course code or subject.
- Tutor Ratings & Reviews: Evaluate tutor performance and choose the best fit.
- Favorites: Save preferred tutors and courses for future sessions.
- Interactive Tools: Tutors can share resources and organize study sessions efficiently.
- Admin Dashboard: Administrators manage tutors, courses, and oversee all activities to maintain system quality.

By centralizing these interactions, Learn Hub ensures a smoother, more reliable tutoring process that saves time and promotes academic success within the university community.

# Setup and installation instructions
Follow these steps to set up Learn Hub locally:
1. Clone the repository (https://github.com/darkwinTech/SWE363ProjectLearnHub.git)
2. Navigate to the project directory (cd SWE363ProjectLearnHub)
## Backend Setup
1. Navigate to the Project Directory (cd backend)
2. Install dependencies (npm install)
3. Start the Backend Server (node server.js)
4. Backend will run at (http://localhost:5000)

## Frontend Setup
1. Navigate to the Project Directory (cd frontend)
2. Install dependencies (npm install)
3. Start the Frontend Development Server (npm start)
4. Frontend will run at (http://localhost:3000)

# Usage instructions and examples
Once the server is running, there are three types of users in Learn Hub: Admin, Tutor, and Student.
Each user type has its own credentials and access level within the system.
To login based on you rule:
1. Admin
  student_affairs@kfupm.edu.sa
  password: admin123
2. Tutor 
  ahmed.tutor@kfupm.edu.sa
  fatima.tutor@kfupm.edu.sa
  mohammed.tutor@kfupm.edu.sa
  sara.tutor@kfupm.edu.sa
  password: tutor123
3. Student 
  hayat.student@kfupm.edu.sa
  aleen.student@kfupm.edu.sa
  ghada.student@kfupm.edu.sa
  fatima.student@kfupm.edu.sa
  password: student123
      
    Access:
    - Search for tutors by course
    - Join tutoring sessions
    - Rate and review tutors
    - Add tutors and courses to favorites for future sessions

## Team member names and roles.
- Aleen Alqarni  
  - Notifications controllers, Notifications routes, Notifications middleware, integration and linking Notifications to Frontend  
  - Support controllers, Support routes, Support middleware, integration and linking Support to Frontend  

- Ghada Alghamdi  
  - Sessions controllers, Sessions routes, Sessions middleware, integration and linking Sessions to Frontend  
  - Announcements controllers, Announcements routes, Announcements middleware, integration and linking Announcements to Frontend  

- Hayat Alghamdi  
  - Course controllers, Course routes, Course middleware, integration and linking Course to Frontend  
  - Favorite controllers, Favorite routes, Favorite middleware, integration and linking Favorite to Frontend  
  - Review controllers, Review routes, Review middleware, integration and linking Review to Frontend  

- Fatima Labban  
  - Booking controllers, Booking routes, Booking middleware, integration and linking Booking to Frontend  
  - Applications controllers, Applications routes, Applications middleware, integration and linking Applications to Frontend  






