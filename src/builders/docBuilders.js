module.exports = {
    prevStats: null,
    buildDocs(stats) {
        let documents = [];
        let nodesStats = stats.nodeStats.body.nodes;
        let nodeDocs = this.buildNodeDocs(nodesStats);
        process.exit();
    },
    buildNodeDocs(nodesStats){
        let nodesDocs = [];
        let nodeArrKeys = Object.keys(nodesStats);
        for(let i=0; i <= nodeArrKeys.length; i++){
            let nodeKey = nodeArrKeys[i];
            let nodeDocument = {
                uuid: nodeArrKeys[i],
                cluster_name: this.getNodeCluster(nodesStats[nodeKey])
            }
        }
    },
    getNodeCluster(nodeStats){
        console.log(nodeStats);
        process.exit(0);
    }
}