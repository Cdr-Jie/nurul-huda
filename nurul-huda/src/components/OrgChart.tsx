// src/components/OrgChart.tsx
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Define the shape of our data
const initialNodes = [
  {
    id: '1',
    position: { x: 250, y: 0 },
    data: { label: 'Pengerusi: Haji Ahmad' },
    style: { background: '#2563eb', color: '#fff', borderRadius: '8px', padding: '10px', width: 'auto' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Setiausaha: Kasim Selamat' },
    style: { background: '#059669', color: '#fff', borderRadius: '8px', padding: '10px' },
  },
  {
    id: '3',
    position: { x: 400, y: 100 },
    data: { label: 'Bendahari: Siti Nur' },
    style: { background: '#059669', color: '#fff', borderRadius: '8px', padding: '10px' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

const OrgChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // CREATE: Add new node
  const addNode = useCallback(() => {
    if (!newNodeLabel.trim()) {
      alert('Sila masukkan label untuk jawatan baru');
      return;
    }

    const newNodeId = (Math.max(...nodes.map((n) => parseInt(n.id) || 0)) + 1).toString();
    const newNode: Node = {
      id: newNodeId,
      position: { x: Math.random() * 400, y: Math.random() * 300 + 100 },
      data: { label: newNodeLabel },
      style: { background: '#7c3aed', color: '#fff', borderRadius: '8px', padding: '10px' },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewNodeLabel('');
    setShowForm(false);
  }, [newNodeLabel, nodes, setNodes]);

  // UPDATE: Edit node label
  const updateNode = useCallback((nodeId: string) => {
    if (!editingLabel.trim()) {
      alert('Sila masukkan label untuk jawatan');
      return;
    }

    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { label: editingLabel } } : node
      )
    );

    setEditingNodeId(null);
    setEditingLabel('');
  }, [editingLabel, setNodes]);

  // DELETE: Remove node and connected edges
  const deleteNode = useCallback((nodeId: string) => {
    if (window.confirm('Adakah anda pasti ingin memadam jawatan ini?')) {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
      setSelectedNode(null);
    }
  }, [setNodes, setEdges]);

  // Handle node click for selection
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  // Function to handle manual connections using the cursor
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
      {/* Org Chart Area */}
      <div style={{ flex: 1, minWidth: '600px' }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            selected: node.id === selectedNode,
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Control Panel */}
      <div style={{ width: '300px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px', overflowY: 'auto', maxHeight: '70vh' }}>
        <h3 style={{ marginTop: 0, color: '#1f2937' }}>Pengurusan Carta Organisasi</h3>

        {/* Add New Node */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ➕ Tambah Jawatan Baru
          </button>

          {showForm && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '6px' }}>
              <input
                type="text"
                placeholder="Cth: Naib Pengerusi: Ahmad Bin Ali"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={addNode}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Tambah
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected Node Operations */}
        {selectedNode && (
          <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '6px', border: '2px solid #3b82f6' }}>
            <h4 style={{ marginTop: 0, color: '#1f2937' }}>Mengubah Jawatan</h4>

            {editingNodeId === selectedNode ? (
              <>
                <input
                  type="text"
                  value={editingLabel}
                  onChange={(e) => setEditingLabel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => updateNode(selectedNode)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditingNodeId(null)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#6b7280',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: '#374151', marginBottom: '10px', wordBreak: 'break-word' }}>
                  <strong>Jawatan:</strong> {nodes.find((n) => n.id === selectedNode)?.data.label}
                </p>
                <button
                  onClick={() => {
                    setEditingNodeId(selectedNode);
                    setEditingLabel(nodes.find((n) => n.id === selectedNode)?.data.label || '');
                  }}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '8px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Ubah Label
                </button>
              </>
            )}

            <button
              onClick={() => deleteNode(selectedNode)}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🗑️ Padam Jawatan
            </button>
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '6px', fontSize: '12px' }}>
          <p style={{ margin: '5px 0', color: '#0369a1' }}>
            <strong>Petunjuk:</strong>
          </p>
          <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#0c4a6e' }}>
            <li>Klik pada jawatan untuk memilih</li>
            <li>Seret untuk menggerakkan posisi</li>
            <li>Hubungkan dengan garis untuk struktur</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;