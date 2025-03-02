"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  BrainCircuitIcon,
  Database,
  DnaIcon,
  FlaskRoundIcon as Flask,
  Globe,
  GraduationCap,
  HeartPulseIcon,
  LockIcon,
  MicroscopeIcon,
  NetworkIcon,
  PhoneIcon as CellIcon,
  PiIcon as PetriDishIcon,
  Search,
  Terminal,
  VolumeIcon as VialIcon,
  ZapIcon,
  SearchIcon,
  WrenchIcon,
} from "lucide-react"
import { FlaskConicalIcon } from "lucide-react" // Import FlaskConicalIcon
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  {
    title: "Molecular Biology",
    description: "Advanced molecular analysis and research tools",
    experiments: [
      {
        icon: BrainCircuitIcon,
        title: "Protein GPS Analysis",
        description: "AI-powered protein localization prediction",
        status: "Operational",
      },
      {
        icon: NetworkIcon,
        title: "Molecular Dynamics Lab",
        description: "Simulate molecular interactions and behavior",
        status: "Beta",
      },
    ],
  },
  {
    title: "Genomics & Sequencing",
    description: "Next-generation DNA and RNA analysis platforms",
    experiments: [
      {
        icon: DnaIcon,
        title: "Advanced Genome Sequencer",
        description: "NGS with comprehensive variant analysis",
        status: "Beta",
      },
      {
        icon: ZapIcon,
        title: "RNA Expression Analyzer",
        description: "Complete RNA-seq and expression analysis",
        status: "Beta",
      },
    ],
  },
  {
    title: "Cell Biology",
    description: "Advanced cell culture and analysis tools",
    experiments: [
      {
        icon: MicroscopeIcon,
        title: "Advanced Cell Imaging",
        description: "High-resolution microscopy with AI-powered analysis",
        status: "Beta",
      },
      {
        icon: PetriDishIcon,
        title: "Smart Cell Culture System",
        description: "Automated culture monitoring with growth optimization",
        status: "Beta",
      },
      {
        icon: CellIcon,
        title: "Cell Signaling Analyzer",
        description: "Advanced pathway and molecular interaction analysis",
        status: "Beta",
      },
      {
        icon: SearchIcon,
        title: "Cancer Cell Detector",
        description: "ML-based cancer cell identification and analysis",
        status: "Beta",
      },
      {
        icon: WrenchIcon,
        title: "Cancer Cell Repair Analysis",
        description: "DNA repair mechanism analysis in cancer cells",
        status: "Beta",
      },
    ],
  },
  {
    title: "Drug Discovery",
    description: "Advanced tools for drug development",
    experiments: [
      {
        icon: FlaskConicalIcon,
        title: "Virtual Drug Screening",
        description: "AI-driven drug screening and molecular docking",
        status: "Beta",
      },
      {
        icon: VialIcon,
        title: "Toxicity Predictor",
        description: "ML-based ADMET property prediction",
        status: "Beta",
      },
      {
        icon: HeartPulseIcon,
        title: "Biomarker Discovery",
        description: "Multi-omics biomarker identification",
        status: "Beta",
      },
    ],
  },
]

export default function Home() {
  const router = useRouter()

  // Update the function name to better match new terminology
  const handleStartAnalysis = () => {
    router.push("/experiments")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-terminal-red bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold flex items-center gap-2 text-terminal-red glow-red">
                <Terminal className="w-6 h-6" />
                BioFusionGPS
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-terminal-red hover:text-terminal-dim-red transition-colors">
                  Features
                </a>
                <a href="#experiments" className="text-terminal-red hover:text-terminal-dim-red transition-colors">
                  Experiments
                </a>
              </div>
            </div>
            <Button
              onClick={handleStartAnalysis}
              className="bg-terminal-red/10 text-terminal-red border-terminal-red/30 hover:bg-terminal-red/20"
            >
              Let's Analysis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="space-y-8 relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold tracking-tight text-terminal-red glow-red"
              >
                Advanced Research Platform for Molecular Biology
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-terminal-orange glow-orange"
              >
                BioFusionGPS: Revolutionizing protein research with AI-powered analysis and real-time 3D visualization
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-4"
              >
                <Button
                  variant="outline"
                  asChild
                  className="border-terminal-red/30 text-terminal-red hover:bg-terminal-red/10"
                >
                  <Link href="/learn">Learn More</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-terminal-red glow-red">Advanced Research Features</h2>
            <p className="mt-4 text-terminal-orange">Comprehensive tools for protein analysis and research</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Flask,
                title: "AI-Powered Analysis",
                description: "Advanced machine learning models for accurate protein localization prediction",
              },
              {
                icon: Database,
                title: "Comprehensive Database",
                description: "Access to extensive protein sequence and structure databases",
              },
              {
                icon: Search,
                title: "Real-time Visualization",
                description: "Interactive 3D visualization of protein structures and cellular locations",
              },
              {
                icon: Globe,
                title: "Global Research Network",
                description: "Collaborate with researchers worldwide and share findings",
              },
              {
                icon: GraduationCap,
                title: "Educational Resources",
                description: "In-depth learning materials and research documentation",
              },
              {
                icon: BookOpen,
                title: "Analysis Tools",
                description: "Export findings in publication-ready formats with detailed reports",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-terminal-red/20 rounded-lg bg-black/80 hover:bg-terminal-red/5 transition-colors"
              >
                <feature.icon className="h-8 w-8 text-terminal-orange mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-terminal-red glow-red">{feature.title}</h3>
                <p className="text-terminal-orange/90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments Section */}
      <section id="experiments" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-terminal-red glow-red">Available Experiments</h2>
            <p className="mt-4 text-terminal-orange">Explore our comprehensive suite of research tools</p>
          </div>
          <div className="space-y-16">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-terminal-red">{category.title}</h3>
                  <p className="text-terminal-orange/70">{category.description}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.experiments.map((experiment, experimentIndex) => (
                    <motion.div
                      key={experimentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: experimentIndex * 0.1 }}
                    >
                      <Card
                        className={`p-6 bg-black/80 border-terminal-red/30 ${
                          experiment.status === "Beta" ? "opacity-75" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <experiment.icon className="h-8 w-8 text-terminal-orange" />
                          <span
                            className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                              experiment.status === "Operational"
                                ? "bg-terminal-red/10 text-terminal-red border border-terminal-red/30"
                                : "bg-terminal-orange/10 text-terminal-orange border border-terminal-orange/30"
                            }`}
                          >
                            {experiment.status === "Beta" && <LockIcon className="w-3 h-3" />}
                            {experiment.status}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold mb-2 text-terminal-red">{experiment.title}</h4>
                        <p className="text-terminal-orange/90 mb-4">{experiment.description}</p>
                        <Button
                          disabled={experiment.status === "Beta"}
                          className={`w-full border border-terminal-red/30 ${
                            experiment.status === "Beta"
                              ? "bg-terminal-red/5 text-terminal-red/50 cursor-not-allowed"
                              : "bg-terminal-red/10 text-terminal-red hover:bg-terminal-red/20"
                          }`}
                        >
                          {experiment.status === "Beta" ? (
                            <>
                              <LockIcon className="w-4 h-4 mr-2" />
                              Coming Soon
                            </>
                          ) : (
                            "Launch Experiment"
                          )}
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

