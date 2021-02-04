
import CollectionStorage from "../basic/CollectionStorage";
import MgrRes from "../res/MgrRes";
import ConfigBulletAIStraight from "./src/ConfigBulletAIStraight";
import ConfigBullet from "./src/ConfigBullet";
import ConfigCommon from "./src/ConfigCommon";
import ConfigEff from "./src/ConfigEff";
import ConfigGun from "./src/ConfigGun";
import ConfigMixMark from "./src/ConfigMixMark";
import ConfigPlane from "./src/ConfigPlane";
import ConfigConave from "./src/ConfigConave";

/**
 * 配置管理器
 */
class MgrCfg {
    /**
     * 单例
     */
    public static inst = new MgrCfg();

	public configBulletAIStraight: CollectionStorage<ConfigBulletAIStraight> = new CollectionStorage<ConfigBulletAIStraight>();
	public configBullet: CollectionStorage<ConfigBullet> = new CollectionStorage<ConfigBullet>();
	public configCommon: CollectionStorage<ConfigCommon> = new CollectionStorage<ConfigCommon>();
	public configEff: CollectionStorage<ConfigEff> = new CollectionStorage<ConfigEff>();
	public configGun: CollectionStorage<ConfigGun> = new CollectionStorage<ConfigGun>();
	public configMixMark: CollectionStorage<ConfigMixMark> = new CollectionStorage<ConfigMixMark>();
	public configPlane: CollectionStorage<ConfigPlane> = new CollectionStorage<ConfigPlane>();
	public configConave: CollectionStorage<ConfigConave> = new CollectionStorage<ConfigConave>();

    /**
     * 初始化
     */
    public Init () {
        var promiseArr = [
			MgrRes.inst.CertainLoadJson("./config/ConfigBulletAIStraight").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configBulletAIStraight.add(new ConfigBulletAIStraight( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigBullet").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configBullet.add(new ConfigBullet( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigCommon").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configCommon.add(new ConfigCommon( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigEff").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configEff.add(new ConfigEff( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigGun").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configGun.add(new ConfigGun( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigMixMark").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configMixMark.add(new ConfigMixMark( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigPlane").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configPlane.add(new ConfigPlane( item ));
				});
			}),
			MgrRes.inst.CertainLoadJson("./config/ConfigConave").loadingPromise
				.then(( jsonData ) => {
					(jsonData.json as any[]).forEach(( item ) => {
					this.configConave.add(new ConfigConave( item ));
				});
			})
        ];
        
        return promiseArr;
    }
}

export default MgrCfg;
