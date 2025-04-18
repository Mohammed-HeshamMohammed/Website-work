// AboutProcess.styles.ts
export const styles = {
  // Container styles - enhanced with deeper gradient and more dynamic background
  container: "py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 via-blue-50/20 to-white min-h-[80vh] flex items-center",
  backgroundContainer: "absolute inset-0 overflow-hidden",
  radialGradient: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,216,0.15)_0%,transparent_70%)]",
  horizontalLine: "absolute top-0 left-0 w-full h-1 bg-[linear-gradient(90deg,transparent,rgba(3,4,94,0.25),transparent)]",
  
  // Header styles - enhanced with better spacing and typography
  headerContainer: "text-center mb-24",
  titleWrapper: "inline-flex  flex items-center justify-center gap-4 mb-3",
  titleAccent: "text-2xl font-light text-[#00B4D8] italic",
  title: "text-4xl sm:text-6xl font-extrabold text-[#03045e] tracking-tight",
  subtitle: "text-xl text-gray-600 max-w-2xl mx-auto font-light",
  titleDivider: "h-1 bg-gradient-to-r from-[#03045e] to-[#00B4D8] mx-auto mt-8 rounded-full",
  
  // Grid and card styles - enhanced with better spacing and responsive design
  stepsGrid: "grid md:grid-cols-2 gap-12 lg:gap-16 relative z-10",
  lastCard: "md:col-span-2 max-w-lg mx-auto",
  card: "relative p-8 sm:p-10 h-full bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:border-[#00B4D8]/60 transition-all duration-300 group rounded-xl shadow-lg hover:shadow-xl will-change-transform",
  
  // Badge styles - enhanced with better 3D effects
  numberBadgeWrapper: "relative",
  numberBadge: "absolute -top-6 -left-6 z-10 w-14 h-14 bg-gradient-to-br from-[#03045e] to-[#00B4D8] rounded-xl shadow-lg flex items-center justify-center text-white text-xl font-bold will-change-transform overflow-hidden",
  numberBadgeShadow: "absolute -top-4 -left-4 w-10 h-10 bg-[#03045e]/20 rounded-xl blur-md",
  
  // Content styles - refined spacing and typography
  contentWrapper: "ml-12 pt-4",
  stepTitle: "text-2xl font-bold text-[#03045e] mb-3 transition-all duration-300 will-change-transform",
  description: "text-gray-600 mb-6 font-light leading-relaxed",
  
  // Metrics styles - enhanced with better gradient
  metricContainer: "space-y-1",
  metric: "text-3xl font-bold bg-gradient-to-r from-[#03045e] to-[#00B4D8] bg-clip-text text-transparent",
  metricLabel: "text-sm text-gray-500",
  
  // Decorative elements - enhanced with better transformations
  decorTopRight: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#03045e]/5 to-transparent rounded-bl-full transform -translate-y-1/2 translate-x-1/2 transition-all duration-500 will-change-transform",
  decorBottomLeft: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00B4D8]/5 to-transparent rounded-tr-full transform translate-y-1/2 -translate-x-1/2 transition-all duration-500 will-change-transform",
  
  // Enhanced unique elements with better performance hints
  pulseEffect: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-xl bg-gradient-to-tr from-[#03045e]/5 via-[#00B4D8]/5 to-transparent -z-10 will-change-opacity will-change-transform",
  floatingShape1: "absolute w-32 h-32 bg-[#00B4D8]/10 rounded-full mix-blend-overlay blur-xl will-change-transform",
  floatingShape2: "absolute w-48 h-48 bg-[#03045e]/10 rounded-full mix-blend-overlay blur-xl will-change-transform",
  
  // Connection lines - enhanced with better visibility
  connectionLinesContainer: "hidden md:block absolute top-1/2 left-0 w-full h-full -z-10 opacity-40 pointer-events-none",
}