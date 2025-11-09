// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion } from "framer-motion"

// // Define the workflow structure matching the reference image
// interface WorkflowNode {
//   id: string
//   label: string
//   description?: string
//   icon: string
//   type: "trigger" | "processor" | "decision" | "action" | "tool"
//   position: { x: number; y: number }
// }

// interface Connection {
//   from: string
//   to: string
//   label?: string
// }

// const WORKFLOW_NODES: WorkflowNode[] = [
//   {
//     id: "trigger",
//     label: "On 'Create User' form submission",
//     icon: "⚡",
//     type: "trigger",
//     position: { x: 100, y: 200 },
//   },
//   {
//     id: "ai-agent",
//     label: "AI Agent",
//     description: "Tools Agent",
//     icon: "🤖",
//     type: "processor",
//     position: { x: 400, y: 200 },
//   },
//   {
//     id: "is-manager",
//     label: "Is manager?",
//     icon: "🔀",
//     type: "decision",
//     position: { x: 700, y: 200 },
//   },
//   {
//     id: "add-channel",
//     label: "Add to channel",
//     description: "invite: channel",
//     icon: "💬",
//     type: "action",
//     position: { x: 1000, y: 100 },
//   },
//   {
//     id: "update-profile",
//     label: "Update profile",
//     description: "updateProfile: user",
//     icon: "👤",
//     type: "action",
//     position: { x: 1000, y: 300 },
//   },
//   {
//     id: "anthropic",
//     label: "Anthropic Chat Model",
//     description: "Model",
//     icon: "🧠",
//     type: "tool",
//     position: { x: 250, y: 450 },
//   },
//   {
//     id: "postgres",
//     label: "Postgres Chat Memory",
//     description: "Memory",
//     icon: "💾",
//     type: "tool",
//     position: { x: 400, y: 450 },
//   },
//   {
//     id: "entra",
//     label: "Microsoft Entra ID",
//     description: "getAll: user",
//     icon: "🔐",
//     type: "tool",
//     position: { x: 550, y: 450 },
//   },
//   {
//     id: "jira",
//     label: "Jira Software",
//     description: "create: user",
//     icon: "📋",
//     type: "tool",
//     position: { x: 700, y: 450 },
//   },
// ]

// const CONNECTIONS: Connection[] = [
//   { from: "trigger", to: "ai-agent" },
//   { from: "ai-agent", to: "is-manager" },
//   { from: "is-manager", to: "add-channel", label: "true" },
//   { from: "is-manager", to: "update-profile", label: "false" },
//   { from: "ai-agent", to: "anthropic" },
//   { from: "ai-agent", to: "postgres" },
//   { from: "ai-agent", to: "entra" },
//   { from: "ai-agent", to: "jira" },
// ]

// const AnimatedParticle = ({ from, to }: { from: WorkflowNode; to: WorkflowNode }) => {
//   return (
//     <motion.circle
//       cx={from.position.x}
//       cy={from.position.y}
//       r="4"
//       fill="#22d3ee"
//       opacity="0.8"
//       animate={{
//         cx: [from.position.x, to.position.x],
//         cy: [from.position.y, to.position.y],
//         opacity: [1, 0.3],
//       }}
//       transition={{
//         duration: 3,
//         repeat: Number.POSITIVE_INFINITY,
//         ease: "linear",
//       }}
//       filter="drop-shadow(0 0 6px #22d3ee)"
//     />
//   )
// }

// const SVGConnections = ({ nodes, connections }: { nodes: WorkflowNode[]; connections: Connection[] }) => {
//   const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       style={{ filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))" }}
//     >
//       <defs>
//         <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
//           <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
//           <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
//         </linearGradient>

//         <filter id="glow">
//           <feGaussianBlur stdDeviation="2" result="coloredBlur" />
//           <feMerge>
//             <feMergeNode in="coloredBlur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>

//       {/* Connection paths */}
//       {connections.map((conn) => {
//         const fromNode = nodeMap[conn.from]
//         const toNode = nodeMap[conn.to]
//         if (!fromNode || !toNode) return null

//         const dx = toNode.position.x - fromNode.position.x
//         const dy = toNode.position.y - fromNode.position.y
//         const distance = Math.sqrt(dx * dx + dy * dy)
//         const controlX = fromNode.position.x + dx / 2
//         const controlY = fromNode.position.y + dy / 2 - distance * 0.2

//         const pathD = `M ${fromNode.position.x} ${fromNode.position.y} Q ${controlX} ${controlY} ${toNode.position.x} ${toNode.position.y}`

//         return (
//           <g key={`${conn.from}-${conn.to}`}>
//             {/* Glowing background path */}
//             <motion.path d={pathD} stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.2" filter="url(#glow)" />

//             {/* Main path with animation */}
//             <motion.path
//               d={pathD}
//               stroke="url(#connectionGradient)"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="10,5"
//               animate={{ strokeDashoffset: [-15, 0] }}
//               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             />

//             {/* Animated particles */}
//             <AnimatedParticle from={fromNode} to={toNode} />

//             {/* Second particle with offset */}
//             <motion.circle
//               cx={fromNode.position.x}
//               cy={fromNode.position.y}
//               r="3"
//               fill="#06b6d4"
//               opacity="0.6"
//               animate={{
//                 cx: [fromNode.position.x, toNode.position.x],
//                 cy: [fromNode.position.y, toNode.position.y],
//                 opacity: [0.8, 0.1],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "linear",
//                 delay: 1,
//               }}
//               filter="drop-shadow(0 0 4px #06b6d4)"
//             />
//           </g>
//         )
//       })}
//     </svg>
//   )
// }

// const WorkflowNodeComponent = ({
//   node,
//   isHighlighted,
//   connectedNodes,
//   onHover,
// }: {
//   node: WorkflowNode
//   isHighlighted: boolean
//   connectedNodes: Set<string>
//   onHover: (id: string | null) => void
// }) => {
//   const isConnected = connectedNodes.has(node.id)
//   const isConnectedToHighlighted = isHighlighted && isConnected

//   return (
//     <motion.div
//       className="absolute"
//       style={{
//         left: `${(node.position.x / 1200) * 100}%`,
//         top: `${(node.position.y / 600) * 100}%`,
//         transform: "translate(-50%, -50%)",
//       }}
//       onHoverStart={() => onHover(node.id)}
//       onHoverEnd={() => onHover(null)}
//     >
//       <motion.div
//         className="absolute inset-0 rounded-lg blur-xl"
//         style={{
//           width: "120px",
//           height: "120px",
//           left: "-20px",
//           top: "-20px",
//         }}
//         animate={{
//           background: isConnectedToHighlighted
//             ? "radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(6, 182, 212, 0.2) 70%, transparent 100%)"
//             : isHighlighted
//               ? "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(6, 182, 212, 0.1) 70%, transparent 100%)"
//               : "radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 100%)",
//         }}
//       />

//       {/* Main node box */}
//      <motion.div
//   className="relative w-24 h-24 rounded-full border-2 border-cyan-400 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center shadow-xl"
//   animate={{
//     borderColor: isConnectedToHighlighted ? "#06b6d4" : isHighlighted ? "#22d3ee" : "#06b6d4",
//     scale: isHighlighted ? 1.1 : 1,
//     boxShadow: isConnectedToHighlighted
//       ? "0 0 30px rgba(34, 211, 238, 0.8), inset 0 0 20px rgba(6, 182, 212, 0.2)"
//       : isHighlighted
//       ? "0 0 20px rgba(34, 211, 238, 0.6)"
//       : "0 0 10px rgba(34, 211, 238, 0.3)",
//   }}
//   transition={{ duration: 0.3 }}
// >

//         {/* Icon */}
//         <motion.div className="text-3xl" animate={{ scale: isHighlighted ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
//           {node.icon}
//         </motion.div>

//         {/* Pulse animation */}
//    <motion.div
//   className="absolute inset-0 rounded-full border border-cyan-300/60"
//   animate={{
//     scale: [1, 1.2],
//     opacity: [0.4, 0],
//   }}
//   transition={{
//     duration: 2.5,
//     repeat: Number.POSITIVE_INFINITY,
//     ease: "easeInOut",
//   }}
//   style={{
//     boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
//   }}
// />

//       </motion.div>

//       {/* Labels */}
//       <motion.div
//         className="mt-2 text-center text-xs font-semibold text-cyan-300"
//         animate={{ opacity: isHighlighted ? 1 : 0.8 }}
//       >
//         {node.label}
//       </motion.div>

//       {/* Description tooltip */}
//       {node.description && (
//         <motion.div
//           className="mt-1 px-2 py-1 bg-slate-800 border border-cyan-500 rounded-md text-xs text-cyan-200 whitespace-nowrap"
//           initial={{ opacity: 0, y: -5 }}
//           animate={{ opacity: isHighlighted ? 1 : 0, y: isHighlighted ? 0 : -5 }}
//           transition={{ duration: 0.2 }}
//           pointerEvents="none"
//         >
//           {node.description}
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

// export function N8nAutomations() {
//   const [hoveredNode, setHoveredNode] = useState<string | null>(null)
//   const nodeMap = useRef(Object.fromEntries(WORKFLOW_NODES.map((n) => [n.id, n])))
//   const nodeConnections = useRef<Map<string, Set<string>>>(new Map())

//   // Build connection map
//   useEffect(() => {
//     const map = new Map<string, Set<string>>()
//     WORKFLOW_NODES.forEach((node) => {
//       map.set(node.id, new Set())
//     })

//     CONNECTIONS.forEach((conn) => {
//       map.get(conn.from)?.add(conn.to)
//       map.get(conn.to)?.add(conn.from)
//     })

//     nodeConnections.current = map
//   }, [])

//   const getConnectedNodes = (nodeId: string): Set<string> => {
//     if (!hoveredNode) return new Set()

//     const connected = new Set<string>()
//     const toVisit = [nodeId]

//     while (toVisit.length > 0) {
//       const current = toVisit.pop()!
//       if (connected.has(current)) continue

//       connected.add(current)

//       const neighbors = nodeConnections.current.get(current) || new Set()
//       neighbors.forEach((neighbor) => {
//         if (!connected.has(neighbor)) {
//           toVisit.push(neighbor)
//         }
//       })
//     }

//     return connected
//   }

//   return (
//     <section className="relative w-full py-20 px-4 overflow-hidden">
//       <div className="absolute inset-0 opacity-30">
//         <svg width="100%" height="100%" className="bg-slate-950">
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <circle cx="2" cy="2" r="0.5" fill="rgba(100, 200, 220, 0.2)" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       {/* Background gradient accents */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <motion.div
//           className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
//           animate={{ y: [0, 40, 0] }}
//           transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
//         />
//         <motion.div
//           className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
//           animate={{ y: [0, -40, 0] }}
//           transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
//         />
//       </div>

//       <div className="relative z-10">
//         {/* Header */}
//       <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <motion.h2
//             className="text-5xl md:text-6xl font-black mb-4 tracking-tight"
//             animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
//           >
//             <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text">
//               ⚙️ AI Workflow Engine
//             </span>
//           </motion.h2>
//           <p className="text-lg text-slate-300 font-medium">
//             Powered by{" "}
//             <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text font-bold">
//               n8n
//             </span>
//           </p>
//           <p className="text-slate-400 text-base mt-2">Automating intelligence from trigger to output in real time.</p>
//         </motion.div>

//         <div className="relative mx-auto" style={{ width: "100%", maxWidth: "1300px", aspectRatio: "1300/650" }}>
//           <SVGConnections nodes={WORKFLOW_NODES} connections={CONNECTIONS} />

//           {/* Render all nodes */}
//           {WORKFLOW_NODES.map((node) => (
//             <WorkflowNodeComponent
//               key={node.id}
//               node={node}
//               isHighlighted={hoveredNode === node.id}
//               connectedNodes={getConnectedNodes(hoveredNode || "")}
//               onHover={setHoveredNode}
//             />
//           ))}
//         </div>

//         {/* Info text */}
//         <motion.p
//           className="text-center mt-12 text-sm text-slate-400"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           Hover over nodes to see connections • Animated data particles flow through the workflow
//         </motion.p>
//       </div>
//     </section>
//   )
// }
