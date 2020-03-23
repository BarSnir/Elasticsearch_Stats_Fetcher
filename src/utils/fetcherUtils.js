module.exports = {
    getISOTimestamp() {
        return new Date().toISOString();
    },
    sendToFile(){
        fs.writeFileSync('nodeStats.json', JSON.stringify(stats.nodeStats, null, 2))
        fs.writeFileSync('indexStats.json', JSON.stringify(stats.indexStats, null, 2))
    }
}