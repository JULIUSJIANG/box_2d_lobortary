export default class ConfigBullet {

	/**
	 * 标识
	 */
	id: number;

	/**
	 * 资源 ID
	 */
	concaveId: number;

	/**
	 * 尺寸
	 */
	sizeScale: number;

	/**
	 * 消散的特效
	 */
	effRelease: number;

	/**
	 * 命中的特效
	 */
	effHit: number;

	public constructor (data: any[]) {
		this.id = data[0];
		this.concaveId = data[1];
		this.sizeScale = data[2];
		this.effRelease = data[3];
		this.effHit = data[4];
	}

	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigBullet): number {
		return cfgItem.id;
	}

	/**
	 * 获取资源 ID
	 * @param cfgItem 
	 */
	public static concaveIdGetter (cfgItem: ConfigBullet): number {
		return cfgItem.concaveId;
	}

	/**
	 * 获取尺寸
	 * @param cfgItem 
	 */
	public static sizeScaleGetter (cfgItem: ConfigBullet): number {
		return cfgItem.sizeScale;
	}

	/**
	 * 获取消散的特效
	 * @param cfgItem 
	 */
	public static effReleaseGetter (cfgItem: ConfigBullet): number {
		return cfgItem.effRelease;
	}

	/**
	 * 获取命中的特效
	 * @param cfgItem 
	 */
	public static effHitGetter (cfgItem: ConfigBullet): number {
		return cfgItem.effHit;
	}
}