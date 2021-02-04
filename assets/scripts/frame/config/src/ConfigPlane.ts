export default class ConfigPlane {

	/**
	 * 标识
	 */
	id: number;

	/**
	 * 资源 ID
	 */
	concaveId: number;

	/**
	 * 身体尺寸的标识
	 */
	sizeScale: number;

	/**
	 * 火炮 ID
	 */
	gunId: number;

	/**
	 * 每秒转向角度
	 */
	turnSpeed: number;

	public constructor (data: any[]) {
		this.id = data[0];
		this.concaveId = data[1];
		this.sizeScale = data[2];
		this.gunId = data[3];
		this.turnSpeed = data[4];
	}

	/**
	 * 获取标识
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigPlane): number {
		return cfgItem.id;
	}

	/**
	 * 获取资源 ID
	 * @param cfgItem 
	 */
	public static concaveIdGetter (cfgItem: ConfigPlane): number {
		return cfgItem.concaveId;
	}

	/**
	 * 获取身体尺寸的标识
	 * @param cfgItem 
	 */
	public static sizeScaleGetter (cfgItem: ConfigPlane): number {
		return cfgItem.sizeScale;
	}

	/**
	 * 获取火炮 ID
	 * @param cfgItem 
	 */
	public static gunIdGetter (cfgItem: ConfigPlane): number {
		return cfgItem.gunId;
	}

	/**
	 * 获取每秒转向角度
	 * @param cfgItem 
	 */
	public static turnSpeedGetter (cfgItem: ConfigPlane): number {
		return cfgItem.turnSpeed;
	}
}