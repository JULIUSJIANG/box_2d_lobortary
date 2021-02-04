export default class ConfigEff {

	/**
	 * 标识
	 */
	id: number;

	/**
	 * 资源 ID
	 */
	res: string;

	/**
	 * 特效维持的时间（单位：秒）
	 */
	keepTime: number;

	public constructor (data: any[]) {
		this.id = data[0];
		this.res = data[1];
		this.keepTime = data[2];
	}

	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigEff): number {
		return cfgItem.id;
	}

	/**
	 * 获取资源 ID
	 * @param cfgItem 
	 */
	public static resGetter (cfgItem: ConfigEff): string {
		return cfgItem.res;
	}

	/**
	 * 获取特效维持的时间（单位：秒）
	 * @param cfgItem 
	 */
	public static keepTimeGetter (cfgItem: ConfigEff): number {
		return cfgItem.keepTime;
	}
}