const express = require('express');
const cors = require('cors');
const { compileToN8n } = require('./services/compiler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/compile', (req, res) => {
  try {
    const { nodes, edges } = req.body;
    
    if (!nodes || !edges) {
      return res.status(400).json({ error: 'Nodes and edges are required' });
    }

    const n8nWorkflow = compileToN8n(nodes, edges);
    
    res.json({
      message: 'Workflow compiled successfully',
      workflow: n8nWorkflow
    });
  } catch (error) {
    console.error('Compilation error:', error);
    res.status(500).json({ error: 'Failed to compile workflow' });
  }
});

app.listen(PORT, () => {
  console.log(`CloudFile Orchestrator running on http://localhost:${PORT}`);
});
