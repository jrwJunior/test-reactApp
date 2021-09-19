export class AuthSession {
  getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getIsAuthSession() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user instanceof Object) {
      return true;
    }

    return undefined;
  }

  deleteUserSession() {
    sessionStorage.remove('user');
  }

}

export default new AuthSession();