export default class ConfigBulletAIStraight {

	/**
	 * 标识
	 */
	id: number;

	/**
	 * 移动速度（单位：像素/毫秒）
	 */
	speed: number;

	/**
	 * 距离
	 */
	maxDistance: number;

	public constructor (data: any[]) {
		this.id = data[0];
		this.speed = data[1];
		this.maxDistance = data[2];
	}

	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigBulletAIStraight): number {
		return cfgItem.id;
	}

	/**
	 * 获取移动速度（单位：像素/毫秒）
	 * @param cfgItem 
	 */
	public static speedGetter (cfgItem: ConfigBulletAIStraight): number {
		return cfgItem.speed;
	}

	/**
	 * 获取距离
	 * @param cfgItem 
	 */
	public static maxDistanceGetter (cfgItem: ConfigBulletAIStraight): number {
		return cfgItem.maxDistance;
	}
}