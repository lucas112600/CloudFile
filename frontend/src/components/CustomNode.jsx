import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Cloud, FileText, Settings, Image as ImageIcon, Send } from 'lucide-react';

const iconMap = {
  trigger: <Cloud />,
  process: <Settings />,
  pdf: <FileText />,
  image: <ImageIcon />,
  output: <Send />
};

const colorMap = {
  trigger: 'var(--node-trigger)',
  process: 'var(--node-process)',
  pdf: 'var(--node-process)',
  image: 'var(--node-process)',
  output: 'var(--node-output)'
};

const CustomNode = ({ data, selected }) => {
  return (
    <div className={`custom-node ${selected ? 'selected' : ''}`}>
      {data.type !== 'trigger' && (
        <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      )}
      
      <div className="node-header">
        <div className="node-icon" style={{ backgroundColor: colorMap[data.iconType] || colorMap.process }}>
          {iconMap[data.iconType] || <Settings />}
        </div>
        <div>
          <div className="node-title">{data.label}</div>
          <div className="node-desc">{data.description || 'Configurable Node'}</div>
        </div>
      </div>
      
      {data.type !== 'output' && (
        <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      )}
    </div>
  );
};

export default CustomNode;
