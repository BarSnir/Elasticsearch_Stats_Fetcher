module.exports = {
    getISOTimestamp() {
        return new Date().toISOString();
    },
    getClusterInfo(currentStats) {
        let resp = currentStats.body;
        let clusterInfo = {};
        clusterInfo['cluster_name'] = resp.cluster_name;
        clusterInfo['sum_of_nodes'] = resp._nodes.successful;
        return clusterInfo;
    },
    sendToFile(){
        fs.writeFileSync('nodeStats.json', JSON.stringify(stats.nodeStats, null, 2))
        fs.writeFileSync('indexStats.json', JSON.stringify(stats.indexStats, null, 2))
    }
}