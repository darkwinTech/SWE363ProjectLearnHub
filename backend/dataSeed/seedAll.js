require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import all models
const User = require("../model/User");
const Course = require("../model/Course");
const TutorProfile = require("../model/TutorProfile");
const Session = require("../model/Sessions");
const Application = require("../model/Applications");
const Booking = require("../model/Booking");
const Review = require("../model/Review");
const Announcement = require("../model/Announcement");
const Favorite = require("../model/Favorite");
const Notification = require("../model/Notification");
const Support = require("../model/Support");

async function seedAll() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// Clear all collections
		console.log("Clearing existing data...");
		await User.deleteMany({});
		await Course.deleteMany({});
		await TutorProfile.deleteMany({});
		await Session.deleteMany({});
		await Application.deleteMany({});
		await Booking.deleteMany({});
		await Review.deleteMany({});
		await Announcement.deleteMany({});
		await Favorite.deleteMany({});
		await Notification.deleteMany({});
		await Support.deleteMany({});

		// Seed Users
		console.log("Seeding Users...");
		const users = [
			{
				name: "Khadijah Al-Safwan",
				email: "student_affairs@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("admin123", 10),
				role: "admin",
				employeeId: "202000001",
				department: "Student affairs",
				manager: "Abdulrahman Al-Otaibi",
			},

			{
				name: "Ahmed Al-Saud",
				email: "ahmed.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202100001", 
				college: "Computing & Mathematics",
				major: "Software Engineering",
				degree: "Bachelor of Science",
				program: "BS in Software Engineering",
				year: "Senior",
			},
			{
				name: "Fatima Al-Rashid",
				email: "fatima.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202200001", 
				college: "Computing & Mathematics",
				major: "Computer Science",
				degree: "Bachelor of Science",
				program: "BS in Computer Science",
				year: "Junior",
			},
			{
				name: "Mohammed Al-Zahrani",
				email: "mohammed.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202300001",
				college: "Engineering",
				major: "Electrical Engineering",
				degree: "Bachelor of Science",
				program: "BS in Electrical Engineering",
				year: "Sophomore",
			},
			{
				name: "Sara Al-Mutairi",
				email: "sara.tutor@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("tutor123", 10),
				role: "tutor",
				studentId: "202400001",
				college: "Computing & Mathematics",
				major: "Mathematics",
				degree: "Bachelor of Science",
				program: "BS in Mathematics",
				year: "Freshman",
			},

			{
				name: "Hayat Al-Ghamdi",
				email: "hayat.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200002",
				college: "Computing & Mathematics",
				major: "Computer Science",
				degree: "Bachelor of Science",
				program: "BS in Computer Science",
				year: "Junior",
			},
			{
				name: "Aleen Al-Qarni",
				email: "aleen.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200003", 
				college: "Computing & Mathematics",
				major: "Software Engineering",
				degree: "Bachelor of Science",
				program: "BS in Software Engineering",
				year: "Junior",
			},
			{
				name: "Ghada Al-Ghamdi",
				email: "ghada.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200004",
				college: "Computing & Mathematics",
				major: "Computer Science",
				degree: "Bachelor of Science",
				program: "BS in Computer Science",
				year: "Junior",
			},
			{
				name: "Fatima Labban",
				email: "fatima.student@kfupm.edu.sa",
				passwordHash: bcrypt.hashSync("student123", 10),
				role: "student",
				studentId: "202200005",
				college: "Computing & Mathematics",
				major: "Software Engineering",
				degree: "Bachelor of Science",
				program: "BS in Software Engineering",
				year: "Junior",
			},
		];

		const insertedUsers = await User.insertMany(users);
		console.log(`Seeded ${insertedUsers.length} users`);

		// Get user IDs by role
		const adminUser = insertedUsers.find(u => u.role === "admin");
		const tutors = insertedUsers.filter(u => u.role === "tutor");
		const students = insertedUsers.filter(u => u.role === "student");

		// Seed Courses
		console.log("Seeding Courses...");
		const courses = [
			{
				courseId: "SWE363",
				title: "Software Engineering",
				description: "Fundamentals of web and mobile applications.",
				department: "Software Engineering",
			},
			{
				courseId: "ICS201",
				title: "Programming Fundamentals",
				description: "Fundamental programming concepts using modern programming languages.",
				department: "Computer Science",
			},
			{
				courseId: "ICS253",
				title: "Discrete Structures",
				description: "Mathematical foundations for computer science including logic, sets, and graphs.",
				department: "Computer Science",
			},
			{
				courseId: "MATH201",
				title: "Calculus I",
				description: "Differential and integral calculus of functions of one variable.",
				department: "Mathematics",
			},
			{
				courseId: "MATH202",
				title: "Calculus II",
				description: "Continuation of Calculus I, including techniques of integration and series.",
				department: "Mathematics",
			},
			{
				courseId: "EE201",
				title: "Circuit Analysis",
				description: "Analysis of electrical circuits using fundamental laws and theorems.",
				department: "Electrical Engineering",
			},
			{
				courseId: "SWE316",
				title: "Database Systems",
				description: "Design and implementation of database systems and SQL.",
				department: "Software Engineering",
			},
			{
				courseId: "ICS343",
				title: "Fundamentals of Computer Networks",
				description: "Introduction to computer networks, protocols, and network architecture.",
				department: "Computer Science",
			},
		];

		const insertedCourses = await Course.insertMany(courses);
		console.log(`Seeded ${insertedCourses.length} courses`);

		// Seed Tutor Profiles
		console.log("Seeding Tutor Profiles...");
		const tutorProfiles = tutors.map((tutor, index) => {
			// Assign courses to tutors - tutors can teach any course, not just their major
			// Assign 2-3 courses per tutor from the available courses
			const courseIndices = [];
			const numCourses = 2 + (index % 2); // 2 or 3 courses per tutor
			
			for (let i = 0; i < numCourses && i < insertedCourses.length; i++) {
				const courseIndex = (index * 2 + i) % insertedCourses.length;
				if (!courseIndices.includes(courseIndex)) {
					courseIndices.push(courseIndex);
				}
			}
			
			const assignedCourses = courseIndices.map(idx => insertedCourses[idx]).filter(Boolean);

			return {
				userId: tutor._id,
				coursesTaught: assignedCourses.map(c => c._id),
				rating: 1 + (index % 5), // Ratings from 1 to 5
			};
		});

		await TutorProfile.insertMany(tutorProfiles);
		console.log(`Seeded ${tutorProfiles.length} tutor profiles`);

		// Seed Sessions
		console.log("Seeding Sessions...");
		const now = new Date();
		const sessions = [];

		// Create sessions for each tutor
		tutors.forEach((tutor, tutorIndex) => {
			const tutorProfile = tutorProfiles.find(tp => tp.userId.toString() === tutor._id.toString());
			if (tutorProfile && tutorProfile.coursesTaught.length > 0) {
				tutorProfile.coursesTaught.forEach((courseId, courseIndex) => {
					// Create 2-3 sessions per tutor per course
					for (let i = 0; i < 2; i++) {
						const sessionDate = new Date(now);
						sessionDate.setDate(sessionDate.getDate() + (tutorIndex * 7) + (courseIndex * 3) + i + 1);
						sessionDate.setHours(10 + (i * 2), 0, 0, 0);

						sessions.push({
							courseId: courseId,
							tutorId: tutor._id,
							tutorName: tutor.name,
							title: `${insertedCourses.find(c => c._id.toString() === courseId.toString())?.title} - Session ${i + 1}`,
							description: `Join this tutoring session to get help with ${insertedCourses.find(c => c._id.toString() === courseId.toString())?.title}. We'll cover key concepts and answer your questions.`,
							dateTime: sessionDate,
							teamsLink: `https://teams.microsoft.com/meet/3921900698584?p=0EUoYHBwD5nwpZK672`,
							status: i === 0 && tutorIndex === 0 ? "completed" : "scheduled",
						});
					}
				});
			}
		});

		const insertedSessions = await Session.insertMany(sessions);
		console.log(`Seeded ${insertedSessions.length} sessions`);

		// Seed Applications
		console.log("Seeding Applications...");
		const applications = [];

		// Some tutors apply to teach additional courses
		tutors.forEach((tutor, index) => {
			if (index < 2) { // First 2 tutors apply for additional courses
				const tutorProfile = tutorProfiles.find(tp => tp.userId.toString() === tutor._id.toString());
				const availableCourses = insertedCourses.filter(c => {
					if (!tutorProfile || !tutorProfile.coursesTaught) return true;
					return !tutorProfile.coursesTaught.some(tc => tc.toString() === c._id.toString());
				});
				
				if (availableCourses.length > 0) {
					applications.push({
						userId: tutor._id,
						courseId: availableCourses[0]._id,
						grade: "A+",
						status: index === 0 ? "approved" : "pending",
					});
				}
			}
		});

		await Application.insertMany(applications);
		console.log(`Seeded ${applications.length} applications`);

		// Seed Bookings
		console.log("Seeding Bookings...");
		const bookings = [];

		// Book some sessions for students
		insertedSessions.forEach((session, index) => {
			if (index < students.length * 2) { // Book first few sessions
				const student = students[index % students.length];
				bookings.push({
					sessionId: session._id,
					studentId: student._id,
					status: "confirmed",
				});
			}
		});

		await Booking.insertMany(bookings);
		console.log(`✓ Seeded ${bookings.length} bookings`);

		// Seed Reviews
		console.log("Seeding Reviews...");
		const reviews = [];

		// Create reviews for completed sessions
		const completedSessions = insertedSessions.filter(s => s.status === "completed");
		completedSessions.forEach((session, index) => {
			const booking = bookings.find(b => b.sessionId.toString() === session._id.toString());
			if (booking) {
				reviews.push({
					sessionId: session._id,
					tutorId: session.tutorId,
					studentId: booking.studentId,
					rating: 4 + (index % 2), // Alternating between 4 and 5
					comment: index % 2 === 0 
						? "Great session! The tutor explained everything clearly and was very helpful."
						: "Excellent tutor! Very knowledgeable and patient. Highly recommend.",
				});
			}
		});

		await Review.insertMany(reviews);
		console.log(`Seeded ${reviews.length} reviews`);

		// Seed Announcements
		console.log("Seeding Announcements...");
		const announcements = [
			{
				adminId: adminUser._id,
				title: "Tutors Needed for SWE363",
				content: "We are looking for qualified tutors to teach SWE363 (Software Engineering). If you have excelled in this course and are interested in helping fellow students, please apply to become a tutor.",
				targetLevel: "Junior",
				courseId: insertedCourses.find(c => c.courseId === "SWE363")?._id,
			},
			{
				adminId: adminUser._id,
				title: "Tutors Needed for ICS201",
				content: "We are seeking tutors for ICS201 (Programming Fundamentals). Students who have achieved high grades in this course are encouraged to apply and help other students succeed.",
				targetLevel: "Sophomore",
				courseId: insertedCourses.find(c => c.courseId === "ICS201")?._id,
			},
			{
				adminId: adminUser._id,
				title: "Tutors Needed for MATH201",
				content: "We need tutors for MATH201 (Calculus I). If you have a strong understanding of calculus and want to help other students, please consider applying to be a tutor.",
				targetLevel: "all",
				courseId: insertedCourses.find(c => c.courseId === "MATH201")?._id,
			},
			{
				adminId: adminUser._id,
				title: "Tutors Needed for All Courses",
				content: "We are actively recruiting tutors for various courses. If you have excelled in any course and are interested in teaching, please apply to become a tutor and help your fellow students succeed.",
				targetLevel: "all",
			},
		];

		await Announcement.insertMany(announcements);
		console.log(`✓ Seeded ${announcements.length} announcements`);

		// Seed Favorites
		console.log("Seeding Favorites...");
		const favorites = [];

		students.forEach((student, index) => {
			// Each student has some favorite tutors and courses
			const favoriteTutors = tutors.slice(0, 2).map(t => t._id); // First 2 tutors
			const favoriteCourses = insertedCourses.slice(0, 2).map(c => c._id); // First 2 courses

			favorites.push({
				studentId: student._id,
				favoriteTutors: favoriteTutors,
				favoriteCourses: favoriteCourses,
			});
		});

		await Favorite.insertMany(favorites);
		console.log(`Seeded ${favorites.length} favorites`);

		// Seed Notifications
		console.log("Seeding Notifications...");
		const notifications = [];

		// Notifications for students about bookings
		bookings.forEach((booking, index) => {
			const session = insertedSessions.find(s => s._id.toString() === booking.sessionId.toString());
			if (session) {
				notifications.push({
					userId: booking.studentId,
					title: "Session Booked Successfully",
					message: `You have successfully booked a session for ${insertedCourses.find(c => c._id.toString() === session.courseId.toString())?.title} on ${new Date(session.dateTime).toLocaleDateString()}.`,
					type: "booking",
					isRead: index % 2 === 0, // Some read, some unread
				});
			}
		});

		// Notifications for tutors about new bookings
		bookings.forEach((booking, index) => {
			const session = insertedSessions.find(s => s._id.toString() === booking.sessionId.toString());
			if (session) {
				notifications.push({
					userId: session.tutorId,
					title: "New Booking",
					message: `A student has booked your session for ${insertedCourses.find(c => c._id.toString() === session.courseId.toString())?.title}.`,
					type: "booking",
					isRead: false,
				});
			}
		});

		// General notifications
		students.forEach((student) => {
			notifications.push({
				userId: student._id,
				title: "Welcome!",
				message: "Welcome to LearnHub! Explore courses and find tutors to help you succeed.",
				type: "general",
				isRead: false,
			});
		});

		await Notification.insertMany(notifications);
		console.log(`Seeded ${notifications.length} notifications`);

		// Seed Support Tickets
		console.log("Seeding Support Tickets...");
		const supportTickets = [
			{
				userId: students[0]._id,
				issue: "I'm having trouble booking a session. The system says the session is full but I can see available spots.",
				status: "pending",
			},
			{
				userId: students[1]._id,
				issue: "How do I cancel a booking?",
				status: "resolved",
				response: "You can cancel a booking from your profile page under the 'My Bookings' section. Please note that cancellations should be made at least 24 hours before the session.",
				respondedBy: adminUser._id,
			},
			{
				userId: tutors[0]._id,
				issue: "I want to add more courses to my profile. How can I do that?",
				status: "in-progress",
			},
			{
				userId: students[2] ? students[2]._id : students[0]._id,
				issue: "The Teams link for my session is not working. Can you help?",
				status: "resolved",
				response: "I've updated the Teams link for your session. Please try again and let me know if you still have issues.",
				respondedBy: adminUser._id,
			},
		];

		await Support.insertMany(supportTickets);
		console.log(`Seeded ${supportTickets.length} support tickets`);

		console.log("\nAll seed data has been successfully created!");
		console.log("\nSummary:");
		console.log(`- Users: ${insertedUsers.length} (${tutors.length} tutors, ${students.length} students, 1 admin)`);
		console.log(`- Courses: ${insertedCourses.length}`);
		console.log(`- Tutor Profiles: ${tutorProfiles.length}`);
		console.log(`- Sessions: ${insertedSessions.length}`);
		console.log(`- Applications: ${applications.length}`);
		console.log(`- Bookings: ${bookings.length}`);
		console.log(`- Reviews: ${reviews.length}`);
		console.log(`- Announcements: ${announcements.length}`);
		console.log(`- Favorites: ${favorites.length}`);
		console.log(`- Notifications: ${notifications.length}`);
		console.log(`- Support Tickets: ${supportTickets.length}`);

		await mongoose.connection.close();
		console.log("\nDatabase connection closed.");
	} catch (err) {
		console.error("Seeding error:", err);
	}
}

seedAll();

