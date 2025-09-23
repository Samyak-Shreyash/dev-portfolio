import { Briefcase, GraduationCap, Laptop } from "lucide-react";

export const siteURL = "http://localhost:3000";
export const DEV_NAME = "Samyak Shreyash";
export const DEV_TITLE = "Software Engineer | Full Stack Developer | Open Source Contributor";
export const DEV_GITHUB= "github.com/Samyak-Shreyash";
export const DEV_LOCATION ="https://maps.app.goo.gl/byM5X639NYpyAan26"
export const DEV_LINKEDIN= "linkedin.com/in/samyak-shreyash";
export const DEV_EMAIL="sam.shreyash@gmail.com";
export const DEV_IMAGE="/profile_img.jpg";
export const CURR_IMG_DARK="/dark_img.png"
export const CURR_IMG_LIGHT="/light_img.png"

export const DEV_RESUME = "/SamyakShreyash_Resume.pdf";
export const ABOUT_ME=[
    "Hello! I'm Samyak Shreyash, a passionate Senior Software Developer with over 6 years of experience building Web applications. I specialize in creating responsive, accessible, and performant user interfaces that provide exceptional user experiences.",
    "I have a strong foundation in both front-end and back-end development, with expertise in Java, Python, and JavaScript. I am proficient in using frameworks like React and Next.js to build dynamic web applications. I also have experience with cloud technologies like AWS and containerization tools like Docker and Kubernetes.",
    "When I'm not coding, you can find me working out, playing Badminton, reading science fiction novels, or experimenting with new recipes in the kitchen."
]

export const FAQS = [
  {
      question: "What services do you offer?",
      answer:
      "I offer a range of services including web development, mobile app development, UI/UX design, and technical consulting. My expertise spans frontend and backend technologies, with a focus on creating exceptional digital experiences.",
  },
  {
      question: "How do you handle project pricing?",
      answer:
      "Project pricing depends on the scope, complexity, and timeline. I offer both fixed-price quotes for well-defined projects and hourly rates for ongoing work. I'm happy to discuss your specific needs and provide a detailed estimate.",
  },
  {
      question: "What is your typical project timeline?",
      answer:
      "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months. I'll provide a detailed timeline during our initial consultation.",
  },
  {
      question: "Do you offer ongoing maintenance and support?",
      answer:
      "Yes, I offer maintenance packages to keep your project running smoothly after launch. This includes regular updates, security patches, performance optimization, and technical support.",
  },
  ]
  
export const TECH_STACK = [
    {
        tech: "Java",
        icon: "Java",
        skill: 5
    },
    {
        tech: "Python",
        icon: "Python",
        skill: 3
    },
    {
        tech: "JavaScript",
        icon: "JavaScript",
        skill: 2
    },
    {
        tech: "React",
        icon: "React",
        skill: 2
    },
    {
        tech: "Next.js",
        icon: "Next.js",
        skill: 2
    },
    {
        tech: "SQL",
        icon: "SQL-Developer",
        skill: 4
    },
    {
        tech: "PostgresSQL",
        icon: "PostgresSQL",
        skill: 3
    },
    {
        tech: "MongoDB",
        icon: "MongoDB",
        skill: 4
    },
    {
        tech: "Docker",
        icon: "Docker",
        skill: 4
    },
    {
        tech: "Kubernetes",
        icon: "Kubernetes",
        skill: 2
    },
    {
        tech: "AWS",
        icon: "AWS",
        skill: 4
    },
    {
        tech: "Git",
        icon: "Git",
        skill: 4
    }
];

    export const WORK_EXP = [
        {
          company: "Mphasis",
          role: "Senior System Software Engineer",
          period: "Oct'2023-Present",
          description:
            " - Developed and enhanced **financial technology** workflows using **Java** and **Spring** Framework, ensuring scalable and maintainable solutions across multiple services."+
            "\n - Managed and optimized data flow using **Sybase**, **MySQL**, and **JDBC**, implemented structured exception handling to improve fault tolerance and minimize runtime errors."+
            "\n - Built full-stack web applications from scratch using **React.js** on the frontend and RESTful APIs on the backend, providing **real-time insights** and functionality to end-users."+
            "\n - Designed and deployed robust backend APIs to interact with databases like **Sybase** and legacy systems such as Mainframes, enabling **fast and efficient data reconciliation**.",
          technologies: ["Java", "SQL", "PostgreSQL", "Sybase", "Kafka"],
        },
        {
          company: "Baxter International",
          role: "Software Developer II",
          period: "Aug'2021-Oct'2023",
          description:
            " - Worked on creation on *Audit System* with **AWS Kinesis streams** to log account activities."+
            "\n - Created major KPIs within the *Sharesource product* and created Analytics features with dashboards and custom alerts providing valuable insights on patient health to end-users(Clinicians)."+
            "\n - Worked on upgrade of projects from **monolithic** to **micro-services**, and upgrade of liferay projects to DXP 7.4."+
            "\n - Developed rule-based engine for recommendation on prescription setting for clinicians."+
            "\n - Conceptualized and developed new features within the mobile-app to Improve User Experience increasing User Acquisition by **15%**."+
            "\n - Developed features for full-stack development of complete new device within ShareSource with *prescription settings for clinicians*, *treatment processing* as well as analysis and complete implementation of *analytics features with dashboards*",          
            technologies: ["Java", "Spring-boot","AWS", "AWS Kinesis streams", "Vue"],
        },
        {
          company: "Wells Fargo",
          role: "Software Developer",
          period: "July'2018-Aug'2021",
          description:
            " - Developed portal with **Spring** to revamp entire *Final Security Review Process* achieving enhanced *Application Security* practices using Java and Oracle Database."+
            "\n - Worked on development of **Penalty Box** with Java for timely audit of security trainings in the Organization."+
            "\n - Created System to track and generate **Consequence Model** of all Applications used and developed in Wells Fargo with **Java**."+
            "\n - **Created** *Wells Fargo-Cisco Bridge tool* for data mapping and validation by Network Security Team with Python and JavaScript."+
            "\n - Developed System in **Python** for *Automated tracking and Management of software patches*, increasing the efficiency by **38%**, Contributed to the development of the company's main product, learning and implementing best practices in web development.",
          technologies: ["Java", "Spring", "Python", "Shell", "Phantomjs", "Oracle"],
        },
      ];


  // Accomplishments for timeline
  export const ACCOMPLISHMENTS = [
    {
        date: "Oct 2023",
        title: "Lead Engineer At Mphasis",
        description: "Started Working at Mphasis",
        icon: <Briefcase className="h-6 w-6" />,
      },
      {
        date: "Aug 2021",
        title: "Application Engineer at Baxter",
        description: "Started Working at Baxter",
        icon: <Briefcase className="h-6 w-6" />,
      },
      {
        date: "Nov 2019",
        title: "Application Engineer-II at Wells Fargo",
        description: "Promoted to Application Engineer II ",
        icon: <Briefcase className="h-6 w-6" />,
      },
      {
        date: "July 2018",
        title: "Application Engineer at Wells Fargo",
        description: "Started Working at Wells Fargo",
        icon: <Briefcase className="h-6 w-6" />,
      },
    {
      date: "June 2018",
      title: "Graduated with Bachelor's Degree",
      description:
        "Completed Bachelor of Engineering in Computer Science",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      date: "Jan 2018",
      title: "Intern at Wells Fargo",
      description:
        "Created Wells Fargo-Cisco Bridge tool increasing the efficiency by 78%",
      icon: <Laptop className="h-6 w-6" />,
    },
    {
      date: "Dec 2015",
      title: "Intern at SafeSecurity, IIT Bombay",
      description:
        "Developed a Threat Life Company Management Web Application.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
        date: "Jan 2015",
        title: "Internshala Student Partner",
        description: "Interned With Internshala",
        icon:  <Laptop className="h-6 w-6" />,
      },
      {
        date: "July 2014",
        title: "Started Schooling in Sathyabama Institute of Science & Technology",
        description:
          "Started graduation studies with Computer Science Engineering",
        icon: <GraduationCap className="h-6 w-6" />
      },
    {
      date: "Mar 2013",
      title: "Graduated from Senior Secondary School",
      description:
        "Concluded Secondary Education from JVM, Shyamali, Ranchi wih Science and Computer Science",
      icon:   <GraduationCap className="h-6 w-6" />
    },
    {
      date: "Mar 2011",
      title: "Graduated from Secondary School",
      description: "Concluded Secondary Education from St. Francis School, Deoghar from ICSE Board",
      icon:  <GraduationCap className="h-6 w-6" />
    },
  ]
  export const siteMetaData = {
    title: DEV_NAME,
    author: DEV_NAME,
    headerTitle: DEV_TITLE,
    description: `Developer Portfolio made by and for ${DEV_NAME}`,
    language: 'en-US',
    interests: 'technology, Coding, travelling, food and fitness',
    locale: 'en-US',
    theme: 'system',
    siteUrl: siteURL,
    siteLogo: `${siteURL}/uploads/${DEV_IMAGE}`,
    socialBanner: `${siteURL}/uploads/${DEV_IMAGE}`,
    email: DEV_EMAIL,
    socialLinks: {
      github: DEV_GITHUB,
      linkedIn: DEV_LINKEDIN
  },
  }
