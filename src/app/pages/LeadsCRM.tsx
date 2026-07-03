import { useState } from "react";
import { Link } from "react-router";
import {
  Phone,
  Mail,
  MessageSquare,
  Plus,
  MoreHorizontal,
  Calendar,
  Building2,
  MapPin,
  Tag,
  X,
  ChevronDown,
} from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

type LeadStatus = "New" | "Contacted" | "Quoted" | "Negotiation" | "Won" | "Lost";

interface Lead {
  id: number;
  name: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  source: string;
  value: string;
  followUp: string;
  notes: string;
  status: LeadStatus;
  avatar: string;
}

const INITIAL_LEADS: Lead[] = [
  { id: 1, name: "Priya Mehta", company: "TechVenture Pvt Ltd", industry: "SaaS", location: "Bangalore", email: "priya@techventure.in", phone: "+91 98765 43210", source: "Marketplace", value: "₹2,50,000", followUp: "June 28, 2026", notes: "Interested in bulk order of industrial components.", status: "New", avatar: "PM" },
  { id: 2, name: "Arjun Kapoor", company: "Stackraft Systems", industry: "IT Services", location: "Hyderabad", email: "arjun@stackraft.io", phone: "+91 87654 32109", source: "Referral", value: "₹4,80,000", followUp: "July 1, 2026", notes: "Demo scheduled. Needs pricing for enterprise plan.", status: "Contacted", avatar: "AK" },
  { id: 3, name: "Deepika Rao", company: "GreenFarm Agro", industry: "Agri-Tech", location: "Pune", email: "deepika@greenfarm.co", phone: "+91 76543 21098", source: "Website", value: "₹1,20,000", followUp: "July 3, 2026", notes: "Quotation sent for organic produce supply contract.", status: "Quoted", avatar: "DR" },
  { id: 4, name: "Rahul Verma", company: "UrbanCraft Exports", industry: "Handicrafts", location: "Jaipur", email: "rahul@urbancraft.in", phone: "+91 65432 10987", source: "Exhibition", value: "₹7,50,000", followUp: "June 30, 2026", notes: "Negotiating payment terms. Needs 60-day credit.", status: "Negotiation", avatar: "RV" },
  { id: 5, name: "Meera Iyer", company: "SpicePath Exports", industry: "Food & Bev", location: "Kochi", email: "meera@spicepath.com", phone: "+91 54321 09876", source: "Marketplace", value: "₹9,20,000", followUp: "Completed", notes: "Deal closed. PO received. Invoice sent.", status: "Won", avatar: "MI" },
  { id: 6, name: "Karan Sharma", company: "BuildTech Infra", industry: "Construction", location: "Delhi", email: "karan@buildtech.co", phone: "+91 43210 98765", source: "Cold Outreach", value: "₹3,00,000", followUp: "—", notes: "Budget constraints. Not moving forward this quarter.", status: "Lost", avatar: "KS" },
  { id: 7, name: "Sunita Nair", company: "Wellness World", industry: "Health & Wellness", location: "Chennai", email: "sunita@wellnessworld.in", phone: "+91 32109 87654", source: "Referral", value: "₹1,80,000", followUp: "July 5, 2026", notes: "New inquiry via referral from Meera Iyer.", status: "New", avatar: "SN" },
  { id: 8, name: "Vikram Singh", company: "LogiTrack India", industry: "Logistics", location: "Mumbai", email: "vikram@logitrack.in", phone: "+91 21098 76543", source: "Website", value: "₹5,40,000", followUp: "July 8, 2026", notes: "Sent intro call. Interested in supply chain services.", status: "Contacted", avatar: "VS" },
];

const COLUMNS: { status: LeadStatus; label: string; color: string }[] = [
  { status: "New", label: "New", color: "#2563EB" },
  { status: "Contacted", label: "Contacted", color: "#0891B2" },
  { status: "Quoted", label: "Quoted", color: "#7C3AED" },
  { status: "Negotiation", label: "Negotiation", color: "#D97706" },
  { status: "Won", label: "Won", color: "#059669" },
  { status: "Lost", label: "Lost", color: "#DC2626" },
];

function AvatarCircle({ initials, color }: { initials: string; color: string }) {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: color }}>
      {initials}
    </div>
  );
}

export default function LeadsCRM() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  const moveToStatus = (id: number, status: LeadStatus) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const leadsInCol = (status: LeadStatus) => leads.filter((l) => l.status === status);

  return (
    <div className="min-h-screen bg-muted/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Tag size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-800 uppercase text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Leads CRM
              </h1>
              <p className="text-xs text-muted-foreground font-mono">MSME Growth Hub · Kanban Pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
              <span className="text-xs font-mono text-muted-foreground">{leads.length} total leads</span>
              <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                {leadsInCol("Won").length} Won
              </span>
            </div>
            <button className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
              <Plus size={14} /> Add Lead
            </button>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="px-4 py-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {COLUMNS.map(({ status, label, color }) => {
            const colLeads = leadsInCol(status);
            return (
              <div
                key={status}
                className="w-72 flex flex-col gap-3"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragging !== null) {
                    moveToStatus(dragging, status);
                    setDragging(null);
                  }
                }}
              >
                {/* Column header */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: `${color}12` }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-sm font-700 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", color }}>
                      {label}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">({colLeads.length})</span>
                  </div>
                  <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                    <Plus size={13} className="text-muted-foreground" />
                  </button>
                </div>

                {/* Lead Cards */}
                <div className="space-y-2.5">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={() => setDragging(lead.id)}
                      onClick={() => setSelected(lead)}
                      className="bg-white rounded-2xl border border-border p-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <AvatarCircle initials={lead.avatar} color={color} />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.company}</p>
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-muted transition-all">
                          <MoreHorizontal size={13} className="text-muted-foreground" />
                        </button>
                      </div>

                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Building2 size={10} /> {lead.industry}
                          <span className="mx-1">·</span>
                          <MapPin size={10} /> {lead.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Tag size={10} /> {lead.source}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-700 text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {lead.value}
                        </span>
                        {lead.followUp !== "Completed" && lead.followUp !== "—" && (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                            <Calendar size={9} /> {lead.followUp}
                          </span>
                        )}
                      </div>

                      {/* Quick actions */}
                      <div className="flex gap-1.5 mt-3 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex items-center gap-1 text-[11px] border border-border text-muted-foreground px-2 py-1 rounded-lg hover:border-primary/40 hover:text-foreground transition-colors">
                          <Phone size={9} /> Call
                        </button>
                        <button className="flex items-center gap-1 text-[11px] border border-border text-muted-foreground px-2 py-1 rounded-lg hover:border-primary/40 hover:text-foreground transition-colors">
                          <Mail size={9} /> Email
                        </button>
                        <button className="flex items-center gap-1 text-[11px] border border-green-200 text-green-700 bg-green-50 px-2 py-1 rounded-lg hover:bg-green-100 transition-colors">
                          <MessageSquare size={9} /> WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {colLeads.length === 0 && (
                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center">
                    <p className="text-xs text-muted-foreground">Drop leads here</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
          <div className="bg-white h-full w-full max-w-md shadow-2xl border-l border-border p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-800 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Lead Details
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{selected.source} · {selected.status}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                <X size={16} />
              </button>
            </div>

            {/* Contact info */}
            <div className="bg-muted/30 rounded-2xl border border-border p-5 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <AvatarCircle initials={selected.avatar} color={COLUMNS.find((c) => c.status === selected.status)?.color ?? "#2563EB"} />
                <div>
                  <p className="font-semibold text-foreground">{selected.name}</p>
                  <p className="text-sm text-muted-foreground">{selected.company}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail size={13} className="text-primary" /> {selected.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={13} className="text-primary" /> {selected.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 size={13} className="text-primary" /> {selected.industry} · {selected.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={13} className="text-primary" /> Follow-up: {selected.followUp}
                </div>
              </div>
            </div>

            {/* Deal value */}
            <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5">
              <span className="text-sm font-semibold text-foreground">Deal Value</span>
              <span className="text-xl font-800 text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{selected.value}</span>
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Notes</label>
              <div className="bg-white border border-border rounded-xl p-3 text-sm text-muted-foreground">{selected.notes}</div>
            </div>

            {/* Move stage */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Move to Stage</label>
              <div className="flex flex-wrap gap-2">
                {COLUMNS.map(({ status, label, color }) => (
                  <button
                    key={status}
                    onClick={() => {
                      moveToStatus(selected.id, status);
                      setSelected({ ...selected, status });
                    }}
                    className={cn("px-3 py-1.5 rounded-full border text-xs font-semibold transition-all", selected.status === status ? "text-white border-transparent" : "bg-white border-border text-muted-foreground hover:border-gray-300")}
                    style={selected.status === status ? { background: color, borderColor: color } : {}}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground text-sm font-semibold py-2.5 rounded-xl hover:border-primary/40 transition-colors">
                <Phone size={14} /> Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-border text-foreground text-sm font-semibold py-2.5 rounded-xl hover:border-primary/40 transition-colors">
                <Mail size={14} /> Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                <MessageSquare size={14} /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
