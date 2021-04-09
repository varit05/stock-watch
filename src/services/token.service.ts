class TokenService {
  private _token: string = "";

  public setSessionToken(token: string) {
    this._token = token;
    console.log(this._token);
  }

  public getSessionToken(): string {
    return this._token;
  }
}

export default new TokenService();
