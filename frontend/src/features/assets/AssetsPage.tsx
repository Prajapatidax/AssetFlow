import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Trash,
  X,
  FileText,
  Bookmark,
  Printer,
  ChevronDown
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

const INITIAL_MOCK_ASSETS: AssetDemo[] = [
  { id: '1', name: 'MacBook Pro 16"', code: 'AST-2026-001', category: 'Hardware', department: 'Engineering', status: 'ALLOCATED', healthScore: 98 },
  { id: '2', name: 'Dell XPS 15"', code: 'AST-2026-002', category: 'Hardware', department: 'Marketing', status: 'ACTIVE', healthScore: 94 },
  { id: '3', name: 'Meeting Room 4K Projector', code: 'AST-2026-003', category: 'AV Equipment', department: 'Operations', status: 'MAINTENANCE', healthScore: 50 },
  { id: '4', name: 'Office Ergonomic Chair', code: 'AST-2026-004', category: 'Furniture', department: 'HR', status: 'ACTIVE', healthScore: 100 },
  { id: '5', name: 'Development Test Server', code: 'AST-2026-005', category: 'Infrastructure', department: 'IT Support', status: 'ALLOCATED', healthScore: 88 },
];

export const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState<AssetDemo[]>(INITIAL_MOCK_ASSETS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtering states
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAssetForPassport, setSelectedAssetForPassport] = useState<AssetDemo | null>(null);

  // New Asset Form State
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState('Hardware');
  const [newAssetDept, setNewAssetDept] = useState('Engineering');
  const [newAssetStatus, setNewAssetStatus] = useState<AssetDemo['status']>('ACTIVE');
  const [newAssetHealth, setNewAssetHealth] = useState(100);

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;

    const newAsset: AssetDemo = {
      id: String(assets.length + 1),
      name: newAssetName,
      code: `AST-2026-0${assets.length + 1}`,
      category: newAssetCategory,
      department: newAssetDept,
      status: newAssetStatus,
      healthScore: Number(newAssetHealth),
    };

    setAssets([newAsset, ...assets]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewAssetName('');
    setNewAssetCategory('Hardware');
    setNewAssetDept('Engineering');
    setNewAssetStatus('ACTIVE');
    setNewAssetHealth(100);
  };

  const handleDeleteAsset = (id: string) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  // Filtered Assets list
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || asset.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: AssetDemo['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Active / Ready</span>;
      case 'ALLOCATED':
        return <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold">Allocated</span>;
      case 'MAINTENANCE':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold">In Maintenance</span>;
      case 'DISPOSED':
        return <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold">Disposed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Assets Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Register, track, allocate, and monitor physical and digital resources.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="h-4 w-4" /> Add Asset
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-premium">
        
        {/* Left Side: Search & Filter Trigger */}
        <div className="flex flex-1 items-center gap-3 relative">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary/80 border border-border focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/10 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="px-3 py-1.5 bg-secondary/80 hover:bg-secondary border border-border rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Filter className="h-3.5 w-3.5 text-muted-foreground" /> 
              <span>Filters</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            <AnimatePresence>
              {isFilterDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsFilterDropdownOpen(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-premium z-20 p-3 space-y-3"
                  >
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted-foreground uppercase">Status</label>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full text-xs border border-border bg-secondary p-1.5 rounded-md focus:outline-none"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="ACTIVE">Active / Ready</option>
                        <option value="ALLOCATED">Allocated</option>
                        <option value="MAINTENANCE">In Maintenance</option>
                        <option value="DISPOSED">Disposed</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted-foreground uppercase">Category</label>
                      <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full text-xs border border-border bg-secondary p-1.5 rounded-md focus:outline-none"
                      >
                        <option value="ALL">All Categories</option>
                        <option value="Hardware">Hardware</option>
                        <option value="AV Equipment">AV Equipment</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Infrastructure">Infrastructure</option>
                      </select>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: View Layout Swapper */}
        <div className="flex items-center gap-2 border border-border rounded-lg p-0.5 bg-secondary self-end md:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded-md transition-all ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded-md transition-all ${viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            title="Grid View"
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
              <tr className="bg-secondary/30 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <th className="py-3 px-5 w-4">
                  <input type="checkbox" className="rounded border-border focus:ring-primary/20 text-primary h-3.5 w-3.5" />
                </th>
                <th className="py-3 px-5">Asset Description</th>
                <th className="py-3 px-5">Asset Code</th>
                <th className="py-3 px-5">Department</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Health</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-xs">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-secondary/35 transition-colors">
                  <td className="py-3.5 px-5">
                    <input type="checkbox" className="rounded border-border focus:ring-primary/20 text-primary h-3.5 w-3.5" />
                  </td>
                  <td className="py-3.5 px-5 flex items-center gap-3">
                    <div className="p-1.5 rounded bg-primary/10 text-primary">
                      <Laptop className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{asset.name}</p>
                      <p className="text-[10px] text-muted-foreground">{asset.category}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-[11px] font-semibold text-muted-foreground">{asset.code}</td>
                  <td className="py-3.5 px-5 font-medium">{asset.department}</td>
                  <td className="py-3.5 px-5">{getStatusBadge(asset.status)}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-secondary border border-border/40 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${asset.healthScore > 90 ? 'bg-emerald-500' : asset.healthScore > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${asset.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-foreground">{asset.healthScore}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-1.5">
                    <button 
                      onClick={() => setSelectedAssetForPassport(asset)}
                      className="p-1 hover:bg-secondary border border-border/50 rounded text-muted-foreground hover:text-foreground transition-colors" 
                      title="Asset Passport & QR"
                    >
                      <QrCode className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="p-1 hover:bg-red-50 border border-border/50 dark:hover:bg-red-950/20 rounded text-muted-foreground hover:text-red-500 transition-colors" 
                      title="Delete Asset"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-muted-foreground font-semibold">
                    No assets found matches filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map(asset => (
            <motion.div
              layout
              key={asset.id}
              className="bg-card border border-border rounded-xl shadow-premium hover:shadow-premium-hover p-5 flex flex-col justify-between gap-4 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-primary/10 text-primary">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-foreground truncate max-w-[130px]">{asset.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{asset.category}</p>
                  </div>
                </div>
                {getStatusBadge(asset.status)}
              </div>

              <div className="space-y-2 border-t border-border/40 pt-3 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Asset Code:</span>
                  <span className="font-mono font-bold text-foreground">{asset.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Department:</span>
                  <span className="font-bold text-foreground">{asset.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-semibold">Health Score:</span>
                  <span className="font-bold text-foreground">{asset.healthScore}%</span>
                </div>
              </div>

              <div className="flex gap-2 border-t border-border/40 pt-3">
                <button 
                  onClick={() => setSelectedAssetForPassport(asset)}
                  className="flex-1 py-1.5 bg-secondary border border-border hover:bg-secondary-foreground hover:text-secondary rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <QrCode className="h-3.5 w-3.5" /> Passport
                </button>
                <button 
                  onClick={() => handleDeleteAsset(asset.id)}
                  className="py-1.5 px-2 bg-secondary border border-border text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-all"
                >
                  <Trash className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
          {filteredAssets.length === 0 && (
            <div className="col-span-full py-12 text-center text-xs text-muted-foreground font-semibold bg-card border border-border rounded-xl">
              No assets found matching filters.
            </div>
          )}
        </div>
      )}

      {/* --- ADD ASSET FORM MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-premium p-6 z-10 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-2.5">
                <h3 className="font-bold text-sm text-foreground">Register New Asset</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleAddAsset} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Asset Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dell Monitor 27"
                    value={newAssetName}
                    onChange={(e) => setNewAssetName(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Category</label>
                    <select
                      value={newAssetCategory}
                      onChange={(e) => setNewAssetCategory(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                    >
                      <option>Hardware</option>
                      <option>AV Equipment</option>
                      <option>Furniture</option>
                      <option>Infrastructure</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Department</label>
                    <select
                      value={newAssetDept}
                      onChange={(e) => setNewAssetDept(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                    >
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                      <option>HR</option>
                      <option>IT Support</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Status</label>
                    <select
                      value={newAssetStatus}
                      onChange={(e) => setNewAssetStatus(e.target.value as AssetDemo['status'])}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                    >
                      <option value="ACTIVE">Active / Ready</option>
                      <option value="ALLOCATED">Allocated</option>
                      <option value="MAINTENANCE">In Maintenance</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Health</label>
                      <span className="text-[10px] font-bold text-primary">{newAssetHealth}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newAssetHealth}
                      onChange={(e) => setNewAssetHealth(Number(e.target.value))}
                      className="w-full mt-2 accent-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3.5 py-2 bg-secondary hover:bg-secondary-foreground hover:text-secondary rounded-lg font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-sm transition-all"
                  >
                    Register Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DIGITAL QR PASSPORT MODAL --- */}
      <AnimatePresence>
        {selectedAssetForPassport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedAssetForPassport(null)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-card border border-border rounded-2xl shadow-premium p-6 z-10 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                  <h3 className="font-bold text-sm text-foreground">Asset Digital Passport</h3>
                </div>
                <button onClick={() => setSelectedAssetForPassport(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* QR and Passport details */}
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
                <div className="p-3 bg-secondary/80 border border-border rounded-xl shadow-sm relative">
                  {/* Mock barcode/QR graphics */}
                  <div className="h-32 w-32 bg-white flex flex-col items-center justify-center border-2 border-black/10 rounded-lg p-2 gap-1.5">
                    <div className="grid grid-cols-4 gap-1 w-full flex-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={`bg-slate-900 rounded-sm ${i % 3 === 0 ? 'h-full' : 'h-1/2'} ${i % 5 === 0 ? 'opacity-20' : ''}`} />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] font-bold tracking-widest text-slate-800">{selectedAssetForPassport.code}</span>
                  </div>
                </div>

                <div className="space-y-1 w-full text-xs">
                  <h4 className="font-bold text-sm text-foreground">{selectedAssetForPassport.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{selectedAssetForPassport.category} Division</p>
                </div>
              </div>

              <div className="space-y-2 text-[11px] border-t border-border/40 pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Registered:</span>
                  <span className="font-bold text-foreground">July 12, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Department:</span>
                  <span className="font-bold text-foreground">{selectedAssetForPassport.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Health Index:</span>
                  <span className="font-bold text-foreground">{selectedAssetForPassport.healthScore}% Status</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Status:</span>
                  <span>{getStatusBadge(selectedAssetForPassport.status)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-1.5 bg-secondary border border-border hover:bg-secondary-foreground hover:text-secondary rounded-lg font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all"
                >
                  <Printer className="h-3.5 w-3.5" /> Print QR Label
                </button>
                <button
                  onClick={() => setSelectedAssetForPassport(null)}
                  className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-[10px] transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AssetsPage;
