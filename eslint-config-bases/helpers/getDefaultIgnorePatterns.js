const getDefaultIgnorePatterns = () => {
  return [
    // Hacky way to silence @yarnpkg/doctor about node_modules detection
    `**/${'node'}_modules`,
    '.cache',
    '**/.cache',
    '**/build',
    '**/dist',
    '**/.storybook',
    '**/storybook-static',
    '**/coverage',
    '**/typegen.ts',
    '**/index.typegen.d.ts',
    '**/*.graphql',
  ];
};

module.exports = {
  getDefaultIgnorePatterns,
};
