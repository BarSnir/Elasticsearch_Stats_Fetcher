module.exports = {
    dto: {
        cluster_name: null,
        node_stats: null,
        index_stats: null
    },
    transform(stats) {
        return stats;
    },
    getNodeStats() {

    }
}