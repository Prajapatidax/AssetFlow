import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Grid,
  List,
  Filter,
  MoreVertical,
  QrCode,
  Laptop,
  CheckCircle,
  AlertTriangle,
  Clock,
  Trash
} from 'lucide-react';

interface AssetDemo {
  id: string;
  name: string;
  code: string;
  category: string;
  department: string;
  status: 'ACTIVE' | 'ALLOCATED' | 'MAINTENANCE' | 'DISPOSED';
  healthScore: number;
}

const MOCK_ASSETS: AssetDemo[] = [
  { id: '1', name: 'MacBook Pro 16"', code: 'AST-2026-001', category: 'Hardware', department: 'Engineering', status: 'ALLOCATED', healthScore: 98 },
  { id: '2', name: 'Dell XPS 15"', code: 'AST-2026-002', category: 'Hardware', department: 'Marketing', status: 'ACTIVE', healthScore: 94 },
  { id: '3', name: 'Meeting Room 4K Projector', code: 'AST-2026-003', category: 'AV Equipment', department: 'Operations', status: 'MAINTENANCE', healthScore: 50 },
  { id: '4', name: 'Office Ergonomic Chair', code: 'AST-2026-004', category: 'Furniture', department: 'HR', status: 'ACTIVE', healthScore: 100 },
  { id: '5', name: 'Development Test Server', code: 'AST-2026-005', category: 'Infrastructure', department: 'IT Support', status: 'ALLOCATED', healthScore: 88 },
];

export const AssetsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = MOCK_ASSETS.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: AssetDemo['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold">Active / Ready</span>;
      case 'ALLOCATED':
        return <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-semibold">Allocated</span>;
      case 'MAINTENANCE':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold">In Maintenance</span>;
      case 'DISPOSED':
        return <span className="bg-slate-500/10 text-slate-500 px-2.5 py-1 rounded-full text-xs font-semibold">Disposed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Assets Directory</h1>
          <p className="text-muted-foreground mt-1">Register, track, allocate, and monitor physical and digital resources.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> Add Asset
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-premium">
        
        {/* Left Side: Search & Filter */}
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>

        {/* Right Side: View Layout Swapper */}
        <div className="flex items-center gap-2 border border-border rounded-lg p-0.5 self-end md:self-auto bg-secondary">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid or List View Render */}
      {viewMode === 'list' ? (
        <div className="bg-card border border-border rounded-xl shadow-premium overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="py-4 px-6">Asset Details</th>
                <th className="py-4 px-6">Code</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Health Score</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary/5 text-primary">
                      <Laptop className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">{asset.category}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs">{asset.code}</td>
                  <td className="py-4 px-6">{asset.department}</td>
                  <td className="py-4 px-6">{getStatusBadge(asset.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-secondary rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${asset.healthScore > 90 ? 'bg-emerald-500' : asset.healthScore > 60 ? 'bg-amber-500' : 'bg-destructive'}`}
                          style={{ width: `${asset.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold">{asset.healthScore}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button className="p-1.5 hover:bg-secondary border border-border/50 rounded-lg text-muted-foreground hover:text-foreground transition-colors" title="Digital Passport / QR">
                      <QrCode className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 hover:bg-secondary border border-border/50 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(asset => (
            <motion.div
              layout
              key={asset.id}
              className="bg-card border border-border rounded-xl shadow-premium hover:shadow-premium-hover p-6 flex flex-col justify-between gap-4 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/5 text-primary">
                    <Laptop className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground truncate max-w-[150px]">{asset.name}</h3>
                    <p className="text-xs text-muted-foreground">{asset.category}</p>
                  </div>
                </div>
                {getStatusBadge(asset.status)}
              </div>

              <div className="space-y-2 border-t border-border/50 pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asset Code:</span>
                  <span className="font-mono font-semibold">{asset.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-semibold">{asset.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Asset Health:</span>
                  <span className="font-semibold">{asset.healthScore}%</span>
                </div>
              </div>

              <div className="flex gap-2 border-t border-border/50 pt-4">
                <button className="flex-1 py-2 bg-secondary border border-border hover:bg-secondary/80 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <QrCode className="h-3.5 w-3.5" /> Passport
                </button>
                <button className="py-2 px-3 bg-secondary border border-border hover:bg-secondary/80 rounded-lg transition-all">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
