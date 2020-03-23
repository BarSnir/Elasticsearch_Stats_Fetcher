module.exports = {
    prevStats: null,
    buildDocs(stats) {
        let documents = [];
        let nodesStats = stats.nodeStats.body.nodes;
        if(!nodesStats){
            return this.getEmptyNodeObject()
        }
        let nodeDocs = this.buildNodeDocs(nodesStats);
        console.log(nodeDocs);
        process.exit();
    },
    buildNodeDocs(nodesStats){
        let nodesDocs = [];
        let nodeArrKeys = Object.keys(nodesStats);
        for(let i=0; i < nodeArrKeys.length; i++){
            let nodeKey = nodeArrKeys[i];
            nodesDocs.push({
                uuid: nodeArrKeys[i],
                cluster_name: this.getNodeCluster(nodesStats[nodeKey]),
                ip: this.getNodeIP(nodesStats[nodeKey]),
                avg_query_time: this.getNodeAvgQueryTime(nodesStats[nodeKey])
            })
        }
        return nodesDocs;
    },
    getNodeCluster(nodeStats){
        return nodeStats.name;
    },
    getNodeIP(nodeStats){
        return nodeStats.ip;
    },
    getNodeAvgQueryTime(nodeStats, nodeToken){
        if(!this.prevStats || nodeStats){
            return null;
        }
        let currentQueyTime = nodeStats.indices.search.query_time_in_millis;
        let oldQueyTime = prevStats[nodeToken].indices.search.query_time_in_millis;
        return currentQueyTime - oldQueyTime;    
    },
    getEmptyNodeObject() {
        return [{
            uuid: null,
            cluster_name: null,
            ip: null,
            avg: 0
        }]
    }
}