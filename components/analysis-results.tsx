"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuitIcon } from "lucide-react"

interface AnalysisResultsProps {
  results: string[]
  isLoading: boolean
}

export default function AnalysisResults({ results, isLoading }: AnalysisResultsProps) {
  return (
    <Card className="bg-black/90 border-terminal-red/30 terminal-box-glow">
      <CardHeader>
        <CardTitle className="text-terminal-red glow-red flex items-center gap-2">
          <BrainCircuitIcon className="w-5 h-5" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 min-h-[200px] font-mono">
          {isLoading ? (
            <div className="text-terminal-orange/70 animate-pulse">Analyzing protein sequence...</div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="text-terminal-orange">
                  {result}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-terminal-orange/50">Enter a sequence and click analyze to see predictions</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

