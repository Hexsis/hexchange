export default (opts: { req: any }): {
  user: {
    isAuthenticated: boolean;
    userId?: string;
    userRole?: string;
  }
} => {

  const { req } = opts;

  if (!req.headers) {
    return { user: { isAuthenticated: false } }
  }

  const user = {
    isAuthenticated: req.headers['is-authenticated'] === 'true',
    id: req.headers['user-id'],
    role: req.headers['user-role']
  }

  return { user };
}