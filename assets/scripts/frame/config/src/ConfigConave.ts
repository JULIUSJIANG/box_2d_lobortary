export default class ConfigConave {

	/**
	 * 标识
1开头：飞机
2开头：子弹
	 */
	id: number;

	/**
	 * 预制体资源名
	 */
	prefabName: string;

	/**
	 * 能够代表该资源形状的多边形
	 */
	dotArr: number[];

	/**
	 * 火炮坐标
	 */
	gunTransform: number[];

	public constructor (data: any[]) {
		this.id = data[0];
		this.prefabName = data[1];
		this.dotArr = data[2];
		this.gunTransform = data[3];
	}

	/**
	 * 获取标识
1开头：飞机
2开头：子弹
	 * @param cfgItem 
	 */
	public static idGetter (cfgItem: ConfigConave): number {
		return cfgItem.id;
	}

	/**
	 * 获取预制体资源名
	 * @param cfgItem 
	 */
	public static prefabNameGetter (cfgItem: ConfigConave): string {
		return cfgItem.prefabName;
	}

	/**
	 * 获取能够代表该资源形状的多边形
	 * @param cfgItem 
	 */
	public static dotArrGetter (cfgItem: ConfigConave): number[] {
		return cfgItem.dotArr;
	}

	/**
	 * 获取火炮坐标
	 * @param cfgItem 
	 */
	public static gunTransformGetter (cfgItem: ConfigConave): number[] {
		return cfgItem.gunTransform;
	}
}