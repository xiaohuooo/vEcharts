import Time from "./time"
/**
 * 根据条件递归祖先元素
 * @param {*} row 数据源
 * @param {*} parent 父级数据
 * @param {*} reg 回调
 */
function regDeepParents(row, parent, reg) {
    if (row[parent]) {
        reg && reg(row[parent]);
        regDeepParents(row[parent], parent, reg);
    }
}
/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */
function flattenDeep(arr = [], childs = "Children") {
    return arr.reduce((flat, item) => {
        return flat.concat(
            item,
            item[childs] ? flattenDeep(item[childs], childs) : []
        );
    }, []);
}
/**
* 将树形数据向上将此支线递归为一维数组
* @param {*} arr 数据源
* @param {*} parent 父级
*/
function flattenDeepParents(arr, parent) {
    return arr.reduce((flat, item) => {
        return flat.concat(
            item[parent] || [],
            item[parent] ? flattenDeepParents([item[parent]], parent) : []
        );
    }, []);
}
/**
 * 筛选出数组中最大值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */
function getMax(arr = [], key = null, stamp = false) {
    let _o = !key ? arr : arr.map(i => i[key]);
    let _t = !stamp ? _o : _o.map(i => Time.init(i).valueOf());
    return Math.max(..._t);
}
export {
    flattenDeep, // 将树形数据向下递归为一维数组
    flattenDeepParents, // 将树形数据向上将此支线递归为一维数组
    regDeepParents, // 根据条件递归祖先元素
    getMax, // 筛选出数组中最大值
};