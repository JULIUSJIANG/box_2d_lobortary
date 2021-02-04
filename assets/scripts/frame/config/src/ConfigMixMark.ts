export default class ConfigMixMark {

	/**
	 * 名称
	 */
	desc: string;

	/**
	 * 标记
	 */
	name: string;

	/**
	 * 正方飞机
	 */
	postivePlane: boolean;

	/**
	 * 正方子弹
	 */
	postiveBullet: boolean;

	/**
	 * 反方飞机
	 */
	antiPlane: boolean;

	/**
	 * 反方子弹
	 */
	antiBullet: boolean;

	public constructor (data: any[]) {
		this.desc = data[0];
		this.name = data[1];
		this.postivePlane = data[2];
		this.postiveBullet = data[3];
		this.antiPlane = data[4];
		this.antiBullet = data[5];
	}

	/**
	 * 获取名称
	 * @param cfgItem 
	 */
	public static descGetter (cfgItem: ConfigMixMark): string {
		return cfgItem.desc;
	}

	/**
	 * 获取标记
	 * @param cfgItem 
	 */
	public static nameGetter (cfgItem: ConfigMixMark): string {
		return cfgItem.name;
	}

	/**
	 * 获取正方飞机
	 * @param cfgItem 
	 */
	public static postivePlaneGetter (cfgItem: ConfigMixMark): boolean {
		return cfgItem.postivePlane;
	}

	/**
	 * 获取正方子弹
	 * @param cfgItem 
	 */
	public static postiveBulletGetter (cfgItem: ConfigMixMark): boolean {
		return cfgItem.postiveBullet;
	}

	/**
	 * 获取反方飞机
	 * @param cfgItem 
	 */
	public static antiPlaneGetter (cfgItem: ConfigMixMark): boolean {
		return cfgItem.antiPlane;
	}

	/**
	 * 获取反方子弹
	 * @param cfgItem 
	 */
	public static antiBulletGetter (cfgItem: ConfigMixMark): boolean {
		return cfgItem.antiBullet;
	}
}