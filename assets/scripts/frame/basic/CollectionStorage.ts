import utilCollection from "./UtilCollection";

/**
 * 集合存储器
 */
class CollectionStorage<T> {

    /**
     * 具体实现
     */
    private _core: CollectionStorage.Core<T> = new CollectionStorage.Core<T>();

    /**
     * 返回当前存储的集合
     */
    public get coll () {
        return this._core.list;
    }

    /**
     * 添加
     * @param t 
     */
    public add (t: T) {
        this._core.add(t);
    }

    /**
     * 移除
     * @param t 
     */
    public rem (t: T) {
        this._core.rem(t);
    }

    /**
     * 选择
     * @param selector 
     * @param k 
     */
    public select<K> (selector: (inst: T) => K, k: K): CollectionStorage.Selector<T>  {
        return new CollectionStorage.Selector([this._core]).select(selector, k);
    }
}

namespace CollectionStorage {
    /**
     * 集合存储器
     */
    export class Core<T> {

        /**
         * 集合
         */
        public collection: Set<T> = new Set();

        /**
         * 分类存储
         */
        private _storage: Map<(inst: T) => any, Map<any, Core<T>>> = new Map();

        /**
         * 把实例添加进集合
         * @param t 
         */
        public add (t: T) {
            if (this.collection.has(t)) {
                return;
            };

            this.collection.add( t );
            this.RefreshList();
            // 已经存在的选择器，要把这个新的元素给添加进去
            this._storage.forEach(( storageMap, selector ) => {
                var key = selector(t);
                if (!storageMap.has(key)) {
                    storageMap.set(key, new Core<T>());
                };
                (storageMap as any).get(key).add(t);
            });
        }

        /**
         * 把实例从集合中移除
         * @param t 
         */
        public rem (t: T) {
            if (!this.collection.has(t)) {
                return;
            };
            this.collection.delete(t);
            this.RefreshList();
            this._storage.forEach(( storageMap, selector ) => {
                var key = selector(t);
                (storageMap as any).get(key).rem(t);
            });
        }

        /**
         * 初始化选择器
         * @param selector 
         */
        private initSelector (selector: (inst: T) => any) {
            // 如果已经为这个选择器初始化过了，那么忽略
            if (this._storage.has(selector)) {
                return;
            };

            var map = new Map<any, Core<T>>();
            this._storage.set(selector, map);
            // 穷举集合里面所有元素，按照选择器进行分类
            this.collection.forEach(( val, index ) => {
                var key = selector(val);
                if (!map.has(key)) {
                    map.set(key, new Core<T>());
                };

                (map as any).get(key).add(val);
            });
        }

        /**
         * 按条件进行选择
         * @param selector 
         */
        public select<K> (selector: (inst: T) => K, k: K)  {
            this.initSelector(selector);
            return (this._storage as any).get(selector).get(k);
        }

        public list: T[] = [];

        private RefreshList () {
           this.list = utilCollection.GetSetCollection(this.collection);
        }
    }

    /**
     * 选择器
     */
    export class Selector<T> {
        
        /**
         * 当前所能索引的集合
         */
        private _coreList: Core<T>[];

        public constructor (coreList: Array<Core<T>>) {
            this._coreList = coreList;
        }

        /**
         * 按条件进行选择
         * @param selector 
         */
        public select<K> (selector: (inst: T) => K, k: K)  {
            var coreList: Core<T>[] = this._coreList.map(( core ) => {
                return core.select( selector, k );
            }) as any;
            coreList = coreList.filter(( core ) => {
                return core != null;
            });
            return new Selector(coreList);
        }

        /**
         * 获取当前的集合
         */
        public GetCollection () {
            var totalList: T[] = [];
            this._coreList.forEach(( item ) => {
                item.collection.forEach(( ele ) => {
                    totalList.push(ele);
                });
            });
            return totalList;
        }
    }
}

export default CollectionStorage;