const execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params,(err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

module.exports = {
    execute: execute,
}