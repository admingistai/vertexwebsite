import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude _chatwidget_disabled directory from Next.js compilation
  webpack: (config, { isServer }) => {
    // More comprehensive exclusion of _chatwidget_disabled directory
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule.test && (rule.test.toString().includes('tsx') || rule.test.toString().includes('ts'))) {
        return {
          ...rule,
          exclude: [
            ...(Array.isArray(rule.exclude) ? rule.exclude : [rule.exclude].filter(Boolean)),
            /\/_chatwidget_disabled\//,
            /chatwidget\/widget\//,
          ],
        };
      }
      return rule;
    });
    
    // Add ignore plugin for additional safety
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /_chatwidget_disabled/ },
      { module: /chatwidget\/widget/ },
    ];
    
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Ensure ESLint also ignores these directories
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib'],
  }
};

export default nextConfig;
