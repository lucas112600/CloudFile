/**
 * Compiles a React Flow graph (nodes, edges) into an n8n-compatible JSON workflow.
 * This is a mocked version to demonstrate the transformation logic.
 */
function compileToN8n(nodes, edges) {
  const n8nNodes = [];
  const n8nConnections = {};

  // Build nodes
  nodes.forEach((node) => {
    let n8nType = 'n8n-nodes-base.unknown';
    let typeVersion = 1;
    let parameters = {};

    if (node.data.type === 'trigger') {
      n8nType = 'n8n-nodes-base.googleDriveTrigger';
      parameters = {
        folderId: 'mock-folder-id'
      };
    } else if (node.data.type === 'process') {
      n8nType = 'n8n-nodes-base.function';
      parameters = {
        functionCode: '// Auto-generated from CloudFile\nreturn items;'
      };
    } else if (node.data.type === 'output') {
      n8nType = 'n8n-nodes-base.httpRequest';
      parameters = {
        url: 'https://notify-api.line.me/api/notify',
        method: 'POST'
      };
    }

    n8nNodes.push({
      parameters,
      id: node.id,
      name: node.data.label,
      type: n8nType,
      typeVersion,
      position: [node.position.x, node.position.y]
    });
  });

  // Build connections (edges)
  edges.forEach((edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    if (sourceNode && targetNode) {
      if (!n8nConnections[sourceNode.data.label]) {
        n8nConnections[sourceNode.data.label] = {
          main: [[]]
        };
      }
      
      n8nConnections[sourceNode.data.label].main[0].push({
        node: targetNode.data.label,
        type: 'main',
        index: 0
      });
    }
  });

  return {
    meta: {
      templateCredsSetupCompleted: true
    },
    nodes: n8nNodes,
    connections: n8nConnections
  };
}

module.exports = {
  compileToN8n
};
