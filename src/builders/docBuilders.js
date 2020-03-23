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
            nodesDocs.push(this.getNodeDocument(nodesStats, nodeArrKeys[i]))
        }
        return nodesDocs;
    },
    getNodeDocument(nodesStats, nodeKey){
        return {
            uuid: nodeKey,
            node_name: this.getNodeName(nodesStats[nodeKey]),
            ip: this.getNodeIP(nodesStats[nodeKey]),
            measurements: {
                avg_query_time: this.getNodeAvgQueryTime(nodesStats[nodeKey])
            }
        };
    },
    getNodeName(nodeStats){
        return nodeStats.name;
    },
    getNodeIP(nodeStats){
        return nodeStats.ip;
    },
    getNodeAvgQueryTime(nodeStats, nodeToken){
        if(!this.prevStats){
            return null;
        }
        let currentQueyTime = nodeStats.indices.search.query_time_in_millis;
        let oldQueyTime = prevStats[nodeToken].indices.search.query_time_in_millis;
        return currentQueyTime - oldQueyTime;    
    },
    getEmptyNodeObject() {
        return [{
            uuid: null,
            node_name: null,
            ip: null,
            measurements: {
                avg_query_time: 0
            }
        }];
    }
}