export const createPageUrl = (page: string) => {
  if (page === 'Home') return '/';
  return `/${page}`;
};