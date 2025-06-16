export default class Context {
    private authToken: string = "";

    public setAuthToken(token: string) : void {
        this.authToken = token;
    }

    public tokenExists() : boolean {
        if (this.authToken.length > 0)
            return true;
        return false;
    }
}
