const fetcherUtils = require('../utils/fetcherUtils');

module.exports = {
    prevStats: null,
    buildDocs(stats) {
        let nodesStats = stats.nodeStats.body.nodes;
        if(!nodesStats){
            return this.getEmptyNodeObject()
        }
        let nodeDocs = this.buildNodeDocs(nodesStats);
        this.prevStats = nodesStats;
        return nodeDocs;
    },
    buildBulk(documents){
        let bulk = [];
        documents.forEach(item => {
            bulk.push({ 
                index: { 
                    _index: process.env['index']
                } 
            });
            bulk.push(item);
        });
        return bulk;
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
        let type = "node";
        return {
            type: type,
            uuid: nodeKey,
            timestamp: fetcherUtils.getISOTimestamp(),
            node_name: this.getNodeName(nodesStats[nodeKey]),
            ip: this.getNodeIP(nodesStats[nodeKey]),
            roles: this.getNodeRoles(nodesStats[nodeKey]),
            measurements: {
                os_cpu_percentage: this.getOsCpuPercentage(nodesStats[nodeKey]),
                avg_query_time: this.getNodeAvgQueryTime(nodesStats[nodeKey], nodeKey)
            },
        };
    },
    getNodeName(nodeStats){
        return nodeStats.name;
    },
    getNodeIP(nodeStats){
        return nodeStats.ip;
    },
    getNodeRoles(nodeStats) {
        return nodeStats.roles;
    },
    getOsCpuPercentage(nodeStats){
        return nodeStats.os.cpu.percent;
    },
    getNodeAvgQueryTime(nodeStats, nodeToken){
        if(!this.prevStats || !this.prevStats[nodeToken]){
            return null;
        }
        let currentQueyTime = nodeStats.indices.search.query_time_in_millis;
        let oldQueyTime = this.prevStats[nodeToken].indices.search.query_time_in_millis;
        let deltaQueryTime = currentQueyTime - oldQueyTime;
        return Math.ceil(currentQueyTime / deltaQueryTime);    
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