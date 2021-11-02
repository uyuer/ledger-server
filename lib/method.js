function updateMultiple(model, values = [], where = 'id', extraCondition = '') {
    let sequelize = model.sequelize;
    let tableName = model.tableName;
    let obj = values.reduce((total, currentValue, index, arr) => {
        Object.keys(currentValue).forEach(key => {
            total[key] ? total[key].push(currentValue[key]) : total[key] = [currentValue[key]]
        })
        return total;
    }, {});
    let conditionsArray = obj[where];
    let conditionsString = conditionsArray.toString();
    let snippet = Object.keys(obj).map((key) => {
        let arr = obj[key].map((item, index) => {
            return `WHEN ${conditionsArray[index]} THEN '${item}'`
        })
        return `${key} = CASE ${where} ${arr.join(' ')} END`;
    })
    let snippetString = snippet.join(',')
    let sql = `UPDATE ${tableName} SET ${snippetString} WHERE ${extraCondition ? extraCondition + ' AND' : ''} ${where} IN (${conditionsString})`;
    return sequelize.query(sql, {
        model: model,
        mapToModel: true, // pass true here if you have any mapped fields
        type: sequelize.QueryTypes.UPDATE
    })
}

module.exports = {
    updateMultiple,
}