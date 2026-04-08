import mongoose from "mongoose";

/** Single canonical portfolio document (slug `main`). */
const portfolioSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, default: "main" },
    personalInfo: { type: mongoose.Schema.Types.Mixed, required: true },
    heroRoles: [String],
    profileSummary: String,
    skillCategories: [mongoose.Schema.Types.Mixed],
    experiences: [mongoose.Schema.Types.Mixed],
    projects: [mongoose.Schema.Types.Mixed],
    certifications: [mongoose.Schema.Types.Mixed],
    education: [mongoose.Schema.Types.Mixed],
    codingAchievements: [mongoose.Schema.Types.Mixed],
    awards: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true },
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
