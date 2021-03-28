/**
 * 注册信息用到的类
 */
export default class RDClass<T extends Object> {
    /**
     * 存储的内容
     */
    public cont: T;
    /**
     * 存储的内容
     * @param cont 
     */
    public constructor (
        cont: T
    )
    {
        this.cont = cont;
    }
}