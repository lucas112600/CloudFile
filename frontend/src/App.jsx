import React, { useState } from 'react';
import { useNodesState, useEdgesState } from '@xyflow/react';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import NodeConfigPanel from './components/NodeConfigPanel';
import { X } from 'lucide-react';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 150 },
    data: { label: 'Google Drive Watcher', type: 'trigger', iconType: 'trigger', description: 'Monitor /Invoices folder' },
  },
];

const initialEdges = [];

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [apiResponse, setApiResponse] = useState(null);

  const handleDeploy = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges })
      });
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ error: 'Failed to connect to Orchestrator API. Make sure the backend is running.' });
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">CloudFile <span>Hub</span></div>
        <button className="deploy-btn" onClick={handleDeploy}>Deploy Workflow</button>
      </header>
      
      <div className="main-content">
        <Sidebar />
        <Canvas 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          setNodes={setNodes} 
          setEdges={setEdges}
          onNodeSelect={setSelectedNode} 
        />
        {selectedNode && (
          <NodeConfigPanel 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </div>

      {apiResponse && (
        <div className="api-modal-overlay" onClick={() => setApiResponse(null)}>
          <div className="api-modal" onClick={e => e.stopPropagation()}>
            <div className="api-modal-header">
              <h3>API Response (n8n Workflow JSON)</h3>
              <button className="close-btn" onClick={() => setApiResponse(null)}><X size={16}/></button>
            </div>
            <div className="api-modal-body">
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
            <div className="api-modal-footer">
              <button className="panel-footer-btn" onClick={() => setApiResponse(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

