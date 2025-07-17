import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude _chatwidget_disabled directory from Next.js compilation
  webpack: (config, { isServer }) => {
    // Add rule to exclude _chatwidget_disabled directory
    config.module.rules.forEach((rule: any) => {
      if (rule.test && rule.test.toString().includes('tsx|ts')) {
        rule.exclude = rule.exclude || [];
        if (Array.isArray(rule.exclude)) {
          rule.exclude.push(/_chatwidget_disabled/);
        } else {
          rule.exclude = [rule.exclude, /_chatwidget_disabled/];
        }
      }
    });
    
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
