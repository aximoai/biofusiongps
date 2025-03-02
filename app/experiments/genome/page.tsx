"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DnaIcon } from "lucide-react"
import Link from "next/link"

export default function GenomeSequencing() {
  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-2xl mx-auto bg-black/80 border-terminal-red/30">
        <CardHeader>
          <CardTitle className="text-terminal-red flex items-center gap-2">
            <DnaIcon className="w-6 h-6" />
            Genome Sequencing Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-terminal-orange">
            The Advanced Genome Sequencer platform is currently in development. This next-generation tool will feature:
          </p>
          <ul className="list-disc list-inside space-y-2 text-terminal-orange/80">
            <li>High-throughput DNA sequencing capabilities</li>
            <li>Advanced variant calling and analysis</li>
            <li>Comprehensive genomic mapping</li>
            <li>Integrated analysis pipeline</li>
          </ul>
          <p className="text-terminal-orange mt-4">Expected release: Q3 2024</p>
          <Link href="/experiments" className="text-terminal-red hover:text-terminal-orange transition-colors">
            ← Back to Experiments
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

