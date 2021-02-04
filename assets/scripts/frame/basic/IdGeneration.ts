export default class IdGeneration {
    private _genId = 0;

    public get lastGenId() {
        return this._genId;
    }

    public GenId () {
        return ++this._genId;
    }
}