import React, { useState, useCallback } from 'react';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import NodeConfigPanel from './components/NodeConfigPanel';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleDeploy = () => {
    // Mock deployment to Orchestrator/n8n
    alert('Workflow deployed to CloudFile Engine!');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">CloudFile <span>Hub</span></div>
        <button className="deploy-btn" onClick={handleDeploy}>Deploy Workflow</button>
      </header>
      
      <div className="main-content">
        <Sidebar />
        <Canvas onNodeSelect={setSelectedNode} />
        {selectedNode && (
          <NodeConfigPanel 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
