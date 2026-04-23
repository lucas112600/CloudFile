import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NodeConfigPanel = ({ node, onClose }) => {
  const [nodeName, setNodeName] = useState(node?.data?.label || '');
  const [setting1, setSetting1] = useState('');

  useEffect(() => {
    if (node) {
      setNodeName(node.data.label);
    }
  }, [node]);

  if (!node) return null;

  return (
    <div className="config-panel">
      <div className="config-header">
        <h3>Node Configuration</h3>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="form-group">
        <label>Node Name</label>
        <input 
          type="text" 
          value={nodeName} 
          onChange={(e) => setNodeName(e.target.value)} 
        />
      </div>

      {node.data.type === 'trigger' && (
        <div className="form-group">
          <label>Target Folder ID</label>
          <input type="text" placeholder="e.g. 1a2b3c4d5e..." />
        </div>
      )}

      {node.data.type === 'process' && (
        <div className="form-group">
          <label>Pattern / Action</label>
          <select>
            <option>Append Date (YYYY-MM-DD)</option>
            <option>Convert to PDF</option>
            <option>Compress to ZIP</option>
          </select>
        </div>
      )}

      {node.data.type === 'output' && (
        <div className="form-group">
          <label>API Key / Token</label>
          <input type="password" placeholder="Enter Token..." />
        </div>
      )}
      
      <button className="deploy-btn" style={{ marginTop: 'auto' }} onClick={onClose}>
        Save Config
      </button>
    </div>
  );
};

export default NodeConfigPanel;
