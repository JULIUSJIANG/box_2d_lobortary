export default class ConfigRelease {

	/**
	 * 标识
	 */
	id: number;

	/**
	 * 资源 ID
	 */
	res: string;

	/**
	 * 尺寸（单位：像素）
	 */
	size: number;

	/**
	 * 特效维持的时间（单位：秒）
	 */
	keepTime: number;

	public constructor (data: any[]) {
		this.id = data[0];
		this.res = data[1];
		this.size = data[2];
		this.keepTime = data[3];
	}

	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigRelease): number {
		return cfgItem.id;
	}

	/**
	 * 获取资源 ID
	 * @param cfgItem 
	 */
	public static resGetter (cfgItem: ConfigRelease): string {
		return cfgItem.res;
	}

	/**
	 * 获取尺寸（单位：像素）
	 * @param cfgItem 
	 */
	public static sizeGetter (cfgItem: ConfigRelease): number {
		return cfgItem.size;
	}

	/**
	 * 获取特效维持的时间（单位：秒）
	 * @param cfgItem 
	 */
	public static keepTimeGetter (cfgItem: ConfigRelease): number {
		return cfgItem.keepTime;
	}
}