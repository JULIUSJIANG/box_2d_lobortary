export default class ConfigCommon {

	/**
	 * 飞机的速度
	 */
	planeSpeed: number;

	public constructor (data: any[]) {
		this.planeSpeed = data[0];
	}

	/**
	 * 获取飞机的速度
	 * @param cfgItem 
	 */
	public static planeSpeedGetter (cfgItem: ConfigCommon): number {
		return cfgItem.planeSpeed;
	}
}