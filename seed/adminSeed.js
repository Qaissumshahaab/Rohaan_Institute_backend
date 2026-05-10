require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Course = require('../models/Course');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  await connectDB();

  // Seed super admin
  const existingAdmin = await Admin.findOne({ email: 'protonium33@gmail.com' });
  if (!existingAdmin) {
    await Admin.create({
      name: 'Super Admin',
      email: '',
      password: '',
      role: 'super_admin',
    });
    console.log('✅ Super admin created');
  } else {
    console.log('ℹ️  Super admin already exists');
  }

  // Seed default courses
  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    const courses = [
      {
        title: 'Complete Web Development',
        description: 'Master HTML, CSS, JavaScript, React, Node.js and MongoDB to become a full-stack web developer ready for industry.',
        duration: '6 Months',
        fees: 15000,
        skillLevel: 'Beginner',
        category: 'Web Development',
        isFeatured: true,
        benefits: ['Build real projects', 'Industry-ready skills', 'Certificate', 'Job assistance'],
        hasCertificate: true,
        instructor: { name: 'Sir Ahmed Raza', bio: '8+ years experience in web development' },
        outline: [
          { week: 1, topic: 'HTML Fundamentals', description: 'Structure of web pages' },
          { week: 2, topic: 'CSS & Flexbox', description: 'Styling and layouts' },
          { week: 3, topic: 'JavaScript Basics', description: 'Core programming concepts' },
          { week: 4, topic: 'React.js', description: 'Modern frontend framework' },
          { week: 5, topic: 'Node.js & Express', description: 'Backend development' },
          { week: 6, topic: 'MongoDB', description: 'Database integration' },
        ],
        faqs: [
          { question: 'Do I need prior experience?', answer: 'No, this course starts from scratch.' },
          { question: 'Will I get a certificate?', answer: 'Yes, upon completion.' },
        ],
      },
      {
        title: 'Graphic Designing',
        description: 'Learn Adobe Photoshop, Illustrator, and CorelDRAW. Create logos, banners, social media designs and more.',
        duration: '3 Months',
        fees: 8000,
        skillLevel: 'Beginner',
        category: 'Graphic Design',
        isFeatured: true,
        benefits: ['Photoshop mastery', 'Logo design', 'Portfolio building', 'Freelancing skills'],
        hasCertificate: true,
        instructor: { name: 'Miss Sana Malik', bio: '5+ years as professional graphic designer' },
        outline: [
          { week: 1, topic: 'Photoshop Basics', description: 'Tools and interface' },
          { week: 2, topic: 'Logo Design', description: 'Creating professional logos' },
          { week: 3, topic: 'Social Media Graphics', description: 'Posts and banners' },
        ],
        faqs: [
          { question: 'What software will we use?', answer: 'Adobe Photoshop, Illustrator, CorelDRAW.' },
        ],
      },
      {
        title: 'Digital Marketing',
        description: 'SEO, Social Media Marketing, Google Ads, Facebook Ads, Email Marketing. Grow businesses online.',
        duration: '4 Months',
        fees: 12000,
        skillLevel: 'Beginner',
        category: 'Digital Marketing',
        isFeatured: true,
        benefits: ['SEO skills', 'Paid ads mastery', 'Analytics', 'Freelancing ready'],
        hasCertificate: true,
        instructor: { name: 'Sir Usman Khan', bio: 'Certified digital marketing expert' },
        outline: [
          { week: 1, topic: 'SEO Fundamentals', description: 'Rank on Google' },
          { week: 2, topic: 'Social Media Marketing', description: 'Facebook, Instagram, TikTok' },
          { week: 3, topic: 'Google & Facebook Ads', description: 'Paid advertising' },
          { week: 4, topic: 'Analytics & Reporting', description: 'Track and optimize' },
        ],
        faqs: [],
      },
      {
        title: 'MS Office & Computer Basics',
        description: 'Word, Excel, PowerPoint, and essential computer skills for office work and professional tasks.',
        duration: '2 Months',
        fees: 5000,
        skillLevel: 'Beginner',
        category: 'MS Office',
        isFeatured: false,
        benefits: ['Word processing', 'Excel formulas', 'Presentations', 'Job ready'],
        hasCertificate: true,
        instructor: { name: 'Miss Ayesha Noor', bio: 'Microsoft Office certified trainer' },
        outline: [],
        faqs: [],
      },
      {
        title: 'Freelancing Masterclass',
        description: 'Learn to earn online on Fiverr, Upwork, and Freelancer. Set up your profile, get clients, and scale.',
        duration: '2 Months',
        fees: 7000,
        skillLevel: 'Beginner',
        category: 'Freelancing',
        isFeatured: true,
        benefits: ['Profile optimization', 'Client communication', 'Payment methods', 'Income strategies'],
        hasCertificate: true,
        instructor: { name: 'Sir Bilal Ahmed', bio: 'Top-rated Fiverr freelancer with $50k+ earned' },
        outline: [],
        faqs: [],
      },
      {
        title: 'Python Programming',
        description: 'From basics to advanced Python. Automation, data analysis, scripting, and project-based learning.',
        duration: '4 Months',
        fees: 12000,
        skillLevel: 'Intermediate',
        category: 'Programming',
        isFeatured: true,
        benefits: ['Core Python', 'Automation scripts', 'Data handling', 'Project portfolio'],
        hasCertificate: true,
        instructor: { name: 'Sir Fahad Mehmood', bio: 'Software engineer with Python expertise' },
        outline: [],
        faqs: [],
      },
      {
        title: 'Video Editing Pro',
        description: 'Adobe Premiere Pro, After Effects, and DaVinci Resolve. Create professional videos for YouTube, ads, and events.',
        duration: '3 Months',
        fees: 9000,
        skillLevel: 'Beginner',
        category: 'Video Editing',
        isFeatured: false,
        benefits: ['Professional editing', 'Motion graphics', 'Color grading', 'YouTube ready'],
        hasCertificate: true,
        instructor: { name: 'Sir Hamza Ali', bio: 'Professional video editor with 100+ projects' },
        outline: [],
        faqs: [],
      },
      {
        title: 'UI/UX Design',
        description: 'Figma, Adobe XD, user research, wireframing, prototyping. Design beautiful digital products.',
        duration: '4 Months',
        fees: 13000,
        skillLevel: 'Intermediate',
        category: 'UI/UX Design',
        isFeatured: false,
        benefits: ['Figma mastery', 'User research', 'Prototyping', 'Portfolio building'],
        hasCertificate: true,
        instructor: { name: 'Miss Zara Shah', bio: 'Senior UX designer with global clients' },
        outline: [],
        faqs: [],
      },
    ];

    await Course.insertMany(courses);
    console.log(`✅ ${courses.length} courses seeded`);
  } else {
    console.log('ℹ️  Courses already exist');
  }

  mongoose.disconnect();
  console.log('✅ Seeding complete');
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
