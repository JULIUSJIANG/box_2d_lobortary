export default class ConfigGun {

	/**
	 * 标识
	 */
	id: number;

	/**
	 * 子弹资源
	 */
	bullet: number;

	/**
	 * 冷却
	 */
	cd: number;

	/**
	 * AI类型 1：直线 ConfigBulletAIStraight
	 */
	aiType: number;

	/**
	 * AI ID 决定读表的时候取不同 ID
	 */
	aiID: number;

	public constructor (data: any[]) {
		this.id = data[0];
		this.bullet = data[1];
		this.cd = data[2];
		this.aiType = data[3];
		this.aiID = data[4];
	}

	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigGun): number {
		return cfgItem.id;
	}

	/**
	 * 获取子弹资源
	 * @param cfgItem 
	 */
	public static bulletGetter (cfgItem: ConfigGun): number {
		return cfgItem.bullet;
	}

	/**
	 * 获取冷却
	 * @param cfgItem 
	 */
	public static cdGetter (cfgItem: ConfigGun): number {
		return cfgItem.cd;
	}

	/**
	 * 获取AI类型 1：直线 ConfigBulletAIStraight
	 * @param cfgItem 
	 */
	public static aiTypeGetter (cfgItem: ConfigGun): number {
		return cfgItem.aiType;
	}

	/**
	 * 获取AI ID 决定读表的时候取不同 ID
	 * @param cfgItem 
	 */
	public static aiIDGetter (cfgItem: ConfigGun): number {
		return cfgItem.aiID;
	}
}