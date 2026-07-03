import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import socket from "../socket";
import toast from "react-hot-toast";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import {
  LogOut, FolderGit2, Inbox, Star, Layers, Trash2, CheckCircle,
  XCircle, Edit3, Save, X, LayoutDashboard, Menu, ChevronLeft, Eye, Calendar, Award
} from "lucide-react";

import SortableCard from "../components/SortableCard";

const Dashboard = () => {
  const navigate = useNavigate();

  // Navigation Sidebar States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview, requests, reviews, projects

  // Data States
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Inspection & Modals States
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [edit, setEdit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    technology: "",
    description: "",
    github: "",
    featured: false,
  });

  useEffect(() => {
    fetchData();
    socket.on("refresh-projects", fetchData);
    return () => socket.off("refresh-projects");
  }, []);

  const fetchData = async () => {
    try {
      const [s, p, r, rv] = await Promise.all([
        api.get("/dashboard"),
        api.get("/projects"),
        api.get("/requests"),
        api.get("/reviews/admin"),
      ]);

      setStats(s.data.stats || s.data);
      setProjects(p.data.projects || p.data || []);
      setRequests(r.data.requests || r.data || []);
      
      // Defensively parse variation structures (Object wrapper vs Raw JSON Array)
      const parsedReviews = rv.data.reviews || rv.data.data || rv.data.feedback || rv.data;
      setReviews(Array.isArray(parsedReviews) ? parsedReviews : []);
    } catch (err) {
      toast.error("Failed to load dashboard sync nodes");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const updateStatus = async (id, currentStatus) => {
    try {
      await api.put(`/requests/${id}`, { status: currentStatus });
      toast.success(`Status shifted to ${currentStatus}`);

      if (selectedRequest && selectedRequest._id === id) {
        setSelectedRequest(prev => ({ ...prev, status: currentStatus }));
      }
      fetchData();
    } catch (err) {
      toast.error("Failed to update execution status");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/projects/${deleteId}`);
      toast.success("Project purged");
      setDeleteId(null);
      fetchData();
    } catch (err) {
      toast.error("Failed to purge project");
    }
  };

  const deleteRequest = async (id) => {
    try {
      await api.delete(`/requests/${id}`);
      toast.success("Request deleted");
      if (selectedRequest?._id === id) setSelectedRequest(null);
      fetchData();
    } catch (err) {
      toast.error("Failed to delete request");
    }
  };

  const approveReview = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`);
      toast.success("Review published");
      fetchData();
    } catch (err) {
      toast.error("Failed to approve review");
    }
  };

  // Restructured to act as a state toggle instead of immediate absolute deletion
  const rejectOrDeclineReview = async (id) => {
    try {
      // Calls your delete context or custom unapprove fallback configuration route
      await api.delete(`/reviews/${id}`);
      toast.success("Review status declined");
      fetchData();
    } catch (err) {
      toast.error("Failed to decline review status");
    }
  };

  const openEdit = (p) => {
    setEdit(p);
    setForm({ ...p });
  };

  const saveEdit = async () => {
    try {
      await api.put(`/projects/${edit._id}`, form);
      toast.success("Project schema synced");
      setEdit(null);
      fetchData();
    } catch (err) {
      toast.error("Failed to sync project schema");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p._id === active.id);
    const newIndex = projects.findIndex((p) => p._id === over.id);

    setProjects(arrayMove(projects, oldIndex, newIndex));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "In Progress": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Completed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Cancelled": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  // Safe evaluation variables for counter badge tracking pending items
  const pendingCount = reviews.filter(r => !r.approved).length;

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#090d16] text-sm text-slate-400">
        <div className="animate-pulse tracking-widest uppercase">Syncing Dashboard Cluster...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#090d16] text-slate-100 font-sans antialiased">

      {/* ================= SIDEBAR MODULE ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-900 bg-slate-950 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <Layers className="h-4 w-4 text-white" />
            </div>
            {isSidebarOpen && <span className="font-bold tracking-tight text-white whitespace-nowrap">Nexora Engine</span>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden sm:flex p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
          >
            {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: "overview", label: "Overview Metrics", icon: <LayoutDashboard className="h-4 w-4" /> },
            { id: "projects", label: "Showcase Projects", icon: <FolderGit2 className="h-4 w-4" /> },
            { id: "requests", label: "Client Requests", icon: <Inbox className="h-4 w-4" />, count: requests.length },
            { id: "reviews", label: "Review Feeds", icon: <Star className="h-4 w-4" />, count: pendingCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className={activeTab === tab.id ? "text-white" : "text-slate-500 group-hover:text-slate-300"}>
                  {tab.icon}
                </span>
                {isSidebarOpen && <span className="whitespace-nowrap">{tab.label}</span>}
              </div>
              {isSidebarOpen && tab.count > 0 && (
                <span className={`px-2 py-0.5 text-xxs font-bold rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-900 border border-slate-800 text-blue-400"
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-900">
          <button
            onClick={logout}
            className="w-full group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-rose-950/20 hover:text-rose-400 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4 text-slate-500 group-hover:text-rose-400 transition" />
            {isSidebarOpen && <span className="whitespace-nowrap">Disconnect</span>}
          </button>
        </div>
      </aside>

      {/* ================= CORE CONTENT RUNTIME PANELS ================= */}
      <main className={`flex-1 transition-all duration-300 p-8 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>

        {/* OVERVIEW DATA METRICS ROUTE MAPS */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">System Node Overview</h2>
              <p className="text-slate-500 text-xs mt-0.5">Realtime analytical distribution metrics.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                ["Projects Matrix", stats.totalProjects || 0, <FolderGit2 className="text-blue-400 h-5 w-5" />],
                ["Pipeline Requests", stats.totalRequests || 0, <Inbox className="text-amber-400 h-5 w-5" />],
                ["User Feedback", stats.totalReviews || 0, <Star className="text-purple-400 h-5 w-5" />],
                ["Active Services", stats.totalServices || 0, <Layers className="text-cyan-400 h-5 w-5" />],
              ].map(([label, value, icon]) => (
                <div key={label} className="bg-slate-950 border border-slate-900 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{label}</p>
                    <h2 className="text-2xl font-bold mt-1 text-white tracking-tight">{value}</h2>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">{icon}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECT DRAG CANVAS PANEL */}
        {activeTab === "projects" && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Showcase Portfolios</h2>
              <p className="text-slate-500 text-xs mt-0.5">Drag indices to configure priority matrix order.</p>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={projects.map((p) => p._id)} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
                  {projects.map((p) => (
                    <SortableCard
                      key={p._id}
                      id={p._id}
                      project={p}
                      onEdit={() => openEdit(p)}
                      onDelete={() => setDeleteId(p._id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {/* CLIENT REQUESTS PANEL */}
        {activeTab === "requests" && (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-xl animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-900">
              <h2 className="font-bold text-sm tracking-wide uppercase text-white">Project Request Pipelines</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400 bg-slate-900/30 border-b border-slate-900 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3.5">Client Node</th>
                    <th className="text-left px-6 py-3.5">Target Spec</th>
                    <th className="px-6 py-3.5 text-center">Workflow Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-slate-500 text-xs tracking-wider uppercase">
                        No pipelines processed
                      </td>
                    </tr>
                  ) : (
                    requests.map((r) => (
                      <tr key={r._id} className="hover:bg-slate-900/10 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-200">{r.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{r.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-300 font-medium">{r.projectTitle}</div>
                          <div className="text-xs text-slate-500 max-w-xs truncate mt-0.5">
                            {r.description || "No description provided"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <select
                            value={r.status}
                            onChange={(e) => updateStatus(r._id, e.target.value)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border bg-slate-950 outline-hidden focus:ring-1 focus:ring-blue-500/30 cursor-pointer ${getStatusStyle(r.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedRequest(r)}
                              className="p-2 text-slate-400 hover:text-blue-400 border border-transparent hover:border-blue-950/30 hover:bg-blue-950/10 rounded-xl transition cursor-pointer"
                              title="Inspect Request"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteRequest(r._id)}
                              className="p-2 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-950/30 hover:bg-rose-950/10 rounded-xl transition cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FEEDBACK REVIEWS PANEL (Shows ALL reviews, with conditional Toggle functionality) */}
        {activeTab === "reviews" && (
          <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-xl animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-900 flex justify-between items-center">
              <h2 className="font-bold text-sm tracking-wide uppercase text-white">Social Proof Moderation</h2>
              <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                Total Submissions: {reviews.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400 bg-slate-900/30 border-b border-slate-900 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3.5">Author</th>
                    <th className="px-6 py-3.5 text-left">Metrics</th>
                    <th className="text-left px-6 py-3.5">Content Transcript</th>
                    <th className="px-6 py-3.5 text-center">Status</th>
                    <th className="px-6 py-3.5 text-right">Authorization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-slate-500 text-xs tracking-wider uppercase">
                        No reviews found in registry
                      </td>
                    </tr>
                  ) : (
                    reviews.map((r) => (
                      <tr key={r._id} className="hover:bg-slate-900/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-200">
                          {r.name || r.reviewerName || "Anonymous Node"}
                        </td>

                        <td className="px-6 py-4 text-amber-400 text-xs tracking-widest whitespace-nowrap">
                          {"★".repeat(Math.min(5, Math.max(0, Number(r.rating) || 5)))}
                          {"☆".repeat(Math.min(5, Math.max(0, 5 - (Number(r.rating) || 5))))}
                        </td>

                        <td className="px-6 py-4 text-slate-300 max-w-sm whitespace-pre-wrap">
                          {r.comment || r.reviewText || r.message || "No content string transmitted."}
                        </td>

                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {r.approved ? (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Live / Approved
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              In Queue / Pending
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            {!r.approved ? (
                              /* Shows Approve action trigger if pending */
                              <button
                                onClick={() => approveReview(r._id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white rounded-lg transition cursor-pointer"
                              >
                                <CheckCircle className="h-3.5 w-3.5" /> Approve
                              </button>
                            ) : (
                              /* Switches seamlessly to Decline action trigger if review is already active */
                              <button
                                onClick={() => rejectOrDeclineReview(r._id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-600 hover:text-white rounded-lg transition cursor-pointer"
                              >
                                <XCircle className="h-3.5 w-3.5" /> Decline
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= DETAILED INSPECT POPUP MODAL ================= */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl relative space-y-6">

            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xxs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  Client Pipeline Data Node
                </span>
                <h3 className="text-xl font-bold text-white mt-2 tracking-tight">{selectedRequest.projectTitle}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {selectedRequest._id}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-500 hover:text-white p-1 rounded-lg border border-transparent hover:border-slate-800 hover:bg-slate-950/50 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/60">
                <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Client Name</span>
                <span className="text-slate-200 font-medium">{selectedRequest.name}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/60 flex items-center gap-2.5">
                <Award className="h-4 w-4 text-purple-400 shrink-0" />
                <div className="overflow-hidden">
                  <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Institution / University</span>
                  <span className="text-slate-200 font-medium truncate block">{selectedRequest.university || "Not Documented"}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/60">
                <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Email Node</span>
                <a href={`mailto:${selectedRequest.email}`} className="text-blue-400 hover:underline font-medium truncate block">{selectedRequest.email}</a>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/60">
                <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Phone Reference</span>
                <span className="text-slate-300 font-mono">{selectedRequest.phone || "N/A"}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/60 flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Target Timeline Deadline</span>
                  <span className="text-amber-400 font-mono font-medium">
                    {selectedRequest.deadline ? new Date(selectedRequest.deadline).toLocaleDateString() : "No Deadline Set"}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/60">
                <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Workflow Lifecycle State</span>
                <div className="mt-1">
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => updateStatus(selectedRequest._id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border bg-slate-900 outline-hidden focus:ring-1 focus:ring-blue-500/30 cursor-pointer ${getStatusStyle(selectedRequest.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="block text-xxs font-semibold text-slate-500 uppercase tracking-wider">Functional Specifications Brief</span>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                {selectedRequest.description || "No core details submitted for this structural node."}
              </div>
            </div>

            <div className="flex justify-between items-center text-xxs text-slate-500 font-mono border-t border-slate-800/60 pt-4">
              <span>Ingested: {selectedRequest.createdAt ? new Date(selectedRequest.createdAt).toLocaleString() : "N/A"}</span>
              <span>Updated: {selectedRequest.updatedAt ? new Date(selectedRequest.updatedAt).toLocaleString() : "N/A"}</span>
            </div>

          </div>
        </div>
      )}

      {/* DELETE DIALOG MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Purge System Node?</h3>
            <p className="mt-2 text-sm text-slate-400">This removes the live project from client web routing views immediately.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer">Cancel</button>
              <button onClick={confirmDelete} className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition cursor-pointer"><Trash2 className="h-3.5 w-3.5" /> Confirm Purge</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CONFIGURATION SCHEMA OVERLAY */}
      {edit && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white">
                <Edit3 className="h-4 w-4 text-blue-400" />
                <h3 className="font-bold text-md">Configure Node Parameters</h3>
              </div>
              <button onClick={() => setEdit(null)} className="text-slate-500 hover:text-white transition cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              {["title", "category", "technology", "github"].map((f) => (
                <div key={f}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{f}</label>
                  <input
                    className="w-full text-sm p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-hidden focus:border-blue-500/50 transition focus:ring-1 focus:ring-blue-500/50"
                    value={form[f] || ""}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description Brief</label>
                <textarea rows={3} className="w-full text-sm p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-hidden focus:border-blue-500/50 transition focus:ring-1 focus:ring-blue-500/50 resize-none" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEdit(null)} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer">Dismiss</button>
              <button onClick={saveEdit} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition cursor-pointer"><Save className="h-3.5 w-3.5" /> Commit Schema</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;