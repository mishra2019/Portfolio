import Array "mo:core/Array";
import Text "mo:core/Text";

actor {
  type PersonalInfo = {
    name : Text;
    title : Text;
    email : Text;
    phone : Text;
    linkedin : Text;
    github : Text;
    leetcode : Text;
    website : Text;
    location : Text;
  };

  type Skill = {
    name : Text;
    category : Text;
    level : Nat;
  };

  type Experience = {
    company : Text;
    role : Text;
    startDate : Text;
    endDate : ?Text;
    description : Text;
  };

  type Project = {
    name : Text;
    description : Text;
    technologies : [Text];
    link : Text;
  };

  type Certification = {
    name : Text;
    issuer : Text;
    date : Text;
  };

  type Education = {
    institution : Text;
    degree : Text;
    field : Text;
    startYear : Nat;
    endYear : Nat;
  };

  type CodingAchievement = {
    platform : Text;
    rank : Text;
    score : Nat;
  };

  let personalInfo : PersonalInfo = {
    name = "Roshan Mishra";
    title = "Full Stack Engineer";
    email = "mroshanmishra0072@gmail.com";
    phone = "+91 8420070594";
    linkedin = "https://www.linkedin.com/in/roshan-mishra-51a821174";
    github = "";
    leetcode = "https://leetcode.com/u/roshanmishra0072";
    website = "";
    location = "Bengaluru, India";
  };

  let skillsArray = [
    { name = "TypeScript"; category = "Languages"; level = 5 },
    { name = "Node.js"; category = "Backend"; level = 5 },
    { name = "React"; category = "Frontend"; level = 5 },
    { name = "MongoDB"; category = "Data"; level = 5 },
    { name = "AWS Lambda"; category = "Cloud"; level = 4 },
    { name = "Java"; category = "Languages"; level = 4 },
  ];

  let experiencesArray = [
    {
      company = "MONKSPACES.AI";
      role = "Software Development Engineer (SDE-1)";
      startDate = "2023-06";
      endDate = null;
      description = "Booking engines, rule-based availability, REST APIs, payments (Razorpay, Stripe, Hitpay), AWS Lambda/S3/SQS.";
    },
  ];

  let projectsArray = [
    {
      name = "Full-Stack E-commerce Platform";
      description = "Redux, React, Node, MongoDB; performance and data-fetch optimization.";
      technologies = ["React", "Node.js", "MongoDB", "Material-UI", "Redux"];
      link = "";
    },
    {
      name = "Enterprise Inventory Management System";
      description = "Real-time inventory for 1000+ SKUs; role-based access control.";
      technologies = ["Angular", "Node.js", "MongoDB", "REST"];
      link = "";
    },
  ];

  let certificationsArray = [
    {
      name = "Supervised Machine Learning: Regression and Classification";
      issuer = "Coursera";
      date = "May 2025";
    },
    {
      name = "Engineering: Undergraduate & Masters Asia Virtual Experience Program";
      issuer = "Microsoft";
      date = "";
    },
    {
      name = "InsighT Python";
      issuer = "TCS InsighT";
      date = "";
    },
    {
      name = "Introduction to Programming in C";
      issuer = "TCS iON Digital Learning Hub";
      date = "";
    },
    {
      name = "Introduction to R Software";
      issuer = "NPTEL";
      date = "";
    },
    {
      name = "National Level Quiz on Java (Core) & SQL (Oracle)";
      issuer = "IQAC & Dept. of CS, Govt. General Degree College, Singur";
      date = "";
    },
  ];

  let educationArray = [
    {
      institution = "Government College of Engineering and Ceramic Technology, Kolkata";
      degree = "Bachelor of Technology";
      field = "Computer Science and Engineering";
      startYear = 2019;
      endYear = 2023;
    },
  ];

  let codingAchievementsArray = [] : [CodingAchievement];

  public query ({ caller }) func getPersonalInfo() : async PersonalInfo {
    personalInfo;
  };

  public query ({ caller }) func getSkills() : async [Skill] {
    skillsArray;
  };

  public query ({ caller }) func getExperiences() : async [Experience] {
    experiencesArray;
  };

  public query ({ caller }) func getProjects() : async [Project] {
    projectsArray;
  };

  public query ({ caller }) func getCertifications() : async [Certification] {
    certificationsArray;
  };

  public query ({ caller }) func getEducation() : async [Education] {
    educationArray;
  };

  public query ({ caller }) func getCodingAchievements() : async [CodingAchievement] {
    codingAchievementsArray;
  };
};
