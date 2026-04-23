import React from 'react';
import { Cloud, FileText, Settings, Image as ImageIcon, Send } from 'lucide-react';

const Sidebar = () => {
  const onDragStart = (event, nodeType, label, iconType, desc) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, label, iconType, description: desc }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <h3>Triggers</h3>
      <div 
        className="dndnode trigger" 
        onDragStart={(event) => onDragStart(event, 'trigger', 'Google Drive', 'trigger', 'Watch for new files')} 
        draggable
      >
        <Cloud size={16} /> Google Drive Watcher
      </div>
      
      <div 
        className="dndnode trigger" 
        onDragStart={(event) => onDragStart(event, 'trigger', 'Dropbox', 'trigger', 'Watch for new files')} 
        draggable
      >
        <Cloud size={16} /> Dropbox Watcher
      </div>

      <h3 style={{ marginTop: '10px' }}>Processors</h3>
      <div 
        className="dndnode process" 
        onDragStart={(event) => onDragStart(event, 'process', 'Smart Rename', 'process', 'Rename via pattern')} 
        draggable
      >
        <Settings size={16} /> Smart Rename
      </div>
      <div 
        className="dndnode process" 
        onDragStart={(event) => onDragStart(event, 'process', 'PDF Toolkit', 'pdf', 'Merge, split, encrypt')} 
        draggable
      >
        <FileText size={16} /> PDF Toolkit
      </div>
      <div 
        className="dndnode process" 
        onDragStart={(event) => onDragStart(event, 'process', 'Image Automator', 'image', 'Compress, watermark')} 
        draggable
      >
        <ImageIcon size={16} /> Image Automator
      </div>

      <h3 style={{ marginTop: '10px' }}>Outputs</h3>
      <div 
        className="dndnode output" 
        onDragStart={(event) => onDragStart(event, 'output', 'LINE Notify', 'output', 'Send message')} 
        draggable
      >
        <Send size={16} /> LINE Notify
      </div>
      <div 
        className="dndnode output" 
        onDragStart={(event) => onDragStart(event, 'output', 'S3 Upload', 'output', 'Backup to AWS')} 
        draggable
      >
        <Cloud size={16} /> S3 Upload
      </div>
    </aside>
  );
};

export default Sidebar;
