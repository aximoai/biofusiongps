"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BrainCircuitIcon,
  PhoneIcon as CellIcon,
  DnaIcon,
  FlaskConicalIcon,
  HeartPulseIcon,
  LockIcon,
  MicroscopeIcon,
  NetworkIcon,
  PiIcon as PetriDishIcon,
  Terminal,
  VolumeIcon as VialIcon,
  ZapIcon,
  SearchIcon,
  WrenchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const categories = [
  {
    id: "molecular",
    name: "Molecular Biology",
    description: "Advanced molecular analysis and research tools",
    experiments: [
      {
        id: "proteingps",
        title: "Protein GPS Analysis",
        description: "AI-powered protein localization and interaction prediction",
        icon: BrainCircuitIcon,
        link: "/analysis",
        tags: ["AI", "Protein Analysis", "Molecular Dynamics"],
        status: "Operational",
        highlight: true,
      },
      {
        id: "molecular-dynamics",
        title: "Molecular Dynamics Lab",
        description: "Simulate molecular interactions and behavior",
        icon: NetworkIcon,
        link: "/experiments/molecular-dynamics",
        tags: ["Simulation", "Interaction Analysis", "Energy Calculation"],
        status: "Beta",
      },
    ],
  },
  {
    id: "cell-biology",
    name: "Cell Biology",
    description: "Cell culture and analysis tools",
    experiments: [
      {
        id: "cell-imaging",
        title: "Advanced Cell Imaging",
        description:
          "High-resolution microscopy with AI-powered cell structure analysis and real-time tracking capabilities",
        icon: MicroscopeIcon,
        link: "/experiments/cell-imaging",
        tags: ["Deep Learning", "Image Analysis", "Cell Tracking", "3D Reconstruction"],
        status: "Beta",
      },
      {
        id: "cell-culture",
        title: "Smart Cell Culture System",
        description: "Automated cell culture monitoring with environmental control and growth optimization algorithms",
        icon: PetriDishIcon,
        link: "/experiments/cell-culture",
        tags: ["Automation", "Growth Analysis", "Environmental Control", "Real-time Monitoring"],
        status: "Beta",
      },
      {
        id: "cell-signaling",
        title: "Cell Signaling Analyzer",
        description:
          "Advanced pathway analysis platform for cellular signal transduction and molecular interaction mapping",
        icon: CellIcon,
        link: "/experiments/cell-signaling",
        tags: ["Signal Pathways", "Molecular Interactions", "Network Analysis", "Real-time Tracking"],
        status: "Beta",
      },
      {
        id: "cancer-detector",
        title: "Cancer Cell Detector",
        description:
          "Machine learning-based cancer cell identification with morphological analysis and behavioral pattern recognition",
        icon: SearchIcon,
        link: "/experiments/cancer-detector",
        tags: ["Cancer Research", "ML Detection", "Pattern Recognition", "Cell Analysis"],
        status: "Beta",
      },
      {
        id: "cancer-cell-repair",
        title: "Cancer Cell Repair Analysis",
        description:
          "Comprehensive platform for analyzing DNA repair mechanisms in cancer cells with mutation tracking",
        icon: WrenchIcon,
        link: "/experiments/cancer-cell-repair",
        tags: ["DNA Repair", "Mutation Analysis", "Cancer Research", "Molecular Tracking"],
        status: "Beta",
      },
    ],
  },
  {
    id: "genomics",
    name: "Genomics & Sequencing",
    description: "Next-generation DNA and RNA analysis platforms",
    experiments: [
      {
        id: "genome-sequencing",
        title: "Advanced Genome Sequencer",
        description: "Next-generation DNA sequencing with variant calling and comprehensive genomic analysis pipeline",
        icon: DnaIcon,
        link: "/experiments/genome",
        tags: ["NGS", "Variant Analysis", "Genomic Mapping", "DNA Analysis"],
        status: "Beta",
      },
      {
        id: "rna-analysis",
        title: "RNA Expression Analyzer",
        description: "Complete RNA-seq workflow with differential expression analysis and pathway enrichment",
        icon: ZapIcon,
        link: "/experiments/rna-analysis",
        tags: ["RNA-seq", "Expression Analysis", "Pathway Enrichment", "Transcriptomics"],
        status: "Beta",
      },
    ],
  },
  {
    id: "drug-discovery",
    name: "Drug Discovery",
    description: "Tools for drug development and screening",
    experiments: [
      {
        id: "virtual-screening",
        title: "Virtual Drug Screening",
        description: "AI-driven drug candidate screening with molecular docking and binding affinity prediction",
        icon: FlaskConicalIcon,
        link: "/experiments/virtual-screening",
        tags: ["Drug Design", "Molecular Docking", "AI Prediction", "Binding Analysis"],
        status: "Beta",
      },
      {
        id: "toxicity-predictor",
        title: "Toxicity Predictor",
        description: "Machine learning-based toxicity prediction system with ADMET property analysis",
        icon: VialIcon,
        link: "/experiments/toxicity",
        tags: ["ADMET", "ML Prediction", "Safety Analysis", "Drug Development"],
        status: "Beta",
      },
      {
        id: "biomarker-discovery",
        title: "Biomarker Discovery",
        description: "Integrated platform for identifying and validating novel biomarkers using multi-omics data",
        icon: HeartPulseIcon,
        link: "/experiments/biomarkers",
        tags: ["Multi-omics", "Validation", "Clinical Analysis", "Biomarker Screening"],
        status: "Beta",
      },
    ],
  },
]

export default function LaunchpadPage() {
  const router = useRouter()

  const handleExperimentClick = (experiment: any) => {
    if (experiment.status === "Operational") {
      router.push(experiment.link)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-terminal-red/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2 text-terminal-red glow-red">
              <Terminal className="w-6 h-6" />
              Let's Analysis
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Title Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-terminal-red glow-red">Advanced Analysis Platform</h1>
            <p className="text-terminal-orange text-lg max-w-2xl mx-auto">
              Access cutting-edge tools and platforms for molecular biology, genomics, cell biology, and drug discovery
              research
            </p>
          </motion.div>

          {/* Categories and Experiments */}
          <Tabs defaultValue="molecular" className="space-y-8">
            <TabsList className="bg-black border border-terminal-red/30 w-full justify-start gap-2 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-terminal-orange/70 data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10 rounded px-4 py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-terminal-red">{category.name}</h2>
                  <p className="text-terminal-orange/70">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.experiments.map((experiment, index) => (
                    <motion.div
                      key={experiment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Card
                              className={`bg-black/80 border-terminal-red/30 transition-colors relative ${
                                experiment.highlight
                                  ? "ring-2 ring-terminal-red/50 ring-offset-2 ring-offset-black"
                                  : ""
                              } ${
                                experiment.status === "Beta"
                                  ? "opacity-75 hover:opacity-75 cursor-not-allowed"
                                  : "hover:bg-terminal-red/5 cursor-pointer"
                              }`}
                              onClick={() => handleExperimentClick(experiment)}
                            >
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <CardTitle className="text-terminal-red flex items-center gap-2">
                                      <experiment.icon className="w-5 h-5" />
                                      {experiment.title}
                                    </CardTitle>
                                    <CardDescription className="text-terminal-orange/70">
                                      {experiment.description}
                                    </CardDescription>
                                  </div>
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
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2">
                                  {experiment.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 rounded-full text-xs bg-terminal-red/10 text-terminal-red/70 border border-terminal-red/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter>
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
                              </CardFooter>
                            </Card>
                          </TooltipTrigger>
                          {experiment.status === "Beta" && (
                            <TooltipContent>
                              <p>This experiment is currently in development</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

