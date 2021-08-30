export class Login {
  public username: string;
  public password: string;
  public rememberLogin: boolean;

  public constructor(username: string, password: string, rememberLogin: boolean = false) {
    this.username = username;
    this.password = password;
    this.rememberLogin = rememberLogin;
  }
}
