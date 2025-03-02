"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { BeakerIcon, BookOpenIcon, BrainCircuitIcon, Download, FileText, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import AnalysisResults from "@/components/analysis-results"
import FormulaInput from "@/components/formula-input"
import VisualizationCard from "@/components/visualization-card"
import { ExportDialog } from "@/components/export-dialog"
import { ReportDialog } from "@/components/report-dialog"
import { analyzeProtein } from "@/actions/analyze"
import { addToHistory } from "@/utils/storage"
import { exportToJSON, exportToCSV, exportToText } from "@/utils/export"
import { generateReport } from "@/utils/report"
import EducationContent from "@/components/education-content"
import CellularView from "@/components/cellular-view"

interface AnalysisResult {
  location: string
  confidence: string
  compartments: string[]
  interactions: string
  signals: string
}

export default function AnalysisPage() {
  const { toast } = useToast()
  const [sequence, setSequence] = useState("")
  const [analysisResults, setAnalysisResults] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("analysis")
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)

  // Dialog states
  const [exportOpen, setExportOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

  const handleSequenceChange = useCallback((newSequence: string) => {
    setSequence(newSequence)
  }, [])

  const handleAnalyze = useCallback(async () => {
    try {
      setIsAnalyzing(true)
      const result = await analyzeProtein(sequence)

      // Now result is guaranteed to have all required fields
      setAnalysisData(result)
      setAnalysisResults([
        `Predicted Location: ${result.location}`,
        `Confidence Score: ${result.confidence}`,
        `Associated Compartments: ${result.compartments.join(", ")}`,
        `Potential Interactions: ${result.interactions}`,
        `Localization Signals: ${result.signals}`,
      ])

      addToHistory({
        sequence,
        results: result,
      })

      toast({
        title: "Analysis Complete",
        description: "Your protein sequence has been analyzed successfully.",
      })
    } catch (error) {
      console.error("Analysis error:", error)
      setAnalysisResults(["Error: Unable to analyze protein sequence"])
      setAnalysisData(null)

      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your protein sequence.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [sequence, toast])

  const handleExport = useCallback(
    async (format: string) => {
      if (!sequence || !analysisData) {
        toast({
          title: "Cannot Export",
          description: "Please perform an analysis first.",
          variant: "destructive",
        })
        return
      }

      const exportData = {
        id: crypto.randomUUID(),
        sequence,
        timestamp: new Date().toISOString(),
        results: analysisData,
      }

      let success = false
      switch (format) {
        case "json":
          success = exportToJSON(exportData)
          break
        case "csv":
          success = exportToCSV(exportData)
          break
        case "txt":
          success = exportToText(exportData)
          break
      }

      setExportOpen(false)

      if (success) {
        toast({
          title: "Export Complete",
          description: `Your analysis has been exported in ${format.toUpperCase()} format.`,
        })
      } else {
        toast({
          title: "Export Failed",
          description: "There was an error exporting your analysis.",
          variant: "destructive",
        })
      }
    },
    [sequence, analysisData, toast],
  )

  const handleGenerateReport = useCallback(
    (options: any) => {
      if (!sequence || !analysisData) {
        toast({
          title: "Cannot Generate Report",
          description: "Please perform an analysis first.",
          variant: "destructive",
        })
        return
      }

      const project = {
        id: crypto.randomUUID(),
        name: "Untitled Analysis",
        sequence,
        timestamp: new Date().toISOString(),
        results: analysisData,
      }

      generateReport(project, options)
      setReportOpen(false)
      toast({
        title: "Report Generated",
        description: "Your report has been generated and downloaded.",
      })
    },
    [sequence, analysisData, toast],
  )

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-terminal-red/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2 text-terminal-red glow-red">
              <Terminal className="w-6 h-6" />
              ProtGPS App
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-black border border-terminal-red/30 rounded-lg p-1">
              <TabsTrigger
                value="analysis"
                className="text-terminal-orange/70 data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10 rounded px-4 py-2"
              >
                <BrainCircuitIcon className="w-4 h-4 mr-2" />
                Analysis
              </TabsTrigger>
              <TabsTrigger
                value="visualization"
                className="text-terminal-orange/70 data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10 rounded px-4 py-2"
              >
                <BeakerIcon className="w-4 h-4 mr-2" />
                Visualization
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="text-terminal-orange/70 data-[state=active]:text-terminal-red data-[state=active]:bg-terminal-red/10 rounded px-4 py-2"
              >
                <BookOpenIcon className="w-4 h-4 mr-2" />
                Learn
              </TabsTrigger>
            </TabsList>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="bg-black border-terminal-red/30 text-terminal-orange hover:bg-terminal-red/10 hover:text-terminal-red"
                onClick={() => setExportOpen(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                className="bg-black border-terminal-red/30 text-terminal-orange hover:bg-terminal-red/10 hover:text-terminal-red"
                onClick={() => setReportOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Report
              </Button>
            </div>
          </div>

          <TabsContent value="analysis" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="bg-black/90 border-terminal-red/30 terminal-box-glow">
                    <CardHeader>
                      <CardTitle className="text-terminal-red glow-red flex items-center gap-2">
                        <BrainCircuitIcon className="w-5 h-5" />
                        Protein Sequence Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormulaInput
                        value={sequence}
                        onChange={handleSequenceChange}
                        onAnalyze={handleAnalyze}
                        isAnalyzing={isAnalyzing}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <AnalysisResults results={analysisResults} isLoading={isAnalyzing} />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <VisualizationCard sequence={sequence} analysisData={analysisData} />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="visualization">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/90 border-terminal-red/30 terminal-box-glow lg:col-span-2 h-[600px]">
                <CardHeader>
                  <CardTitle className="text-terminal-red glow-red">Cellular Visualization</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-4rem)]">
                  <CellularView sequence={sequence} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="education">
            <EducationContent />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} onExport={handleExport} />
      <ReportDialog open={reportOpen} onOpenChange={setReportOpen} onGenerate={handleGenerateReport} />
    </div>
  )
}

