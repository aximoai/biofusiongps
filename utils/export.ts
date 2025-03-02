import type { AnalysisResult } from "@/actions/analyze"

interface ExportData {
  id: string
  sequence: string
  timestamp: string
  results: AnalysisResult
  notes?: string
}

// Export to JSON
export const exportToJSON = (data: ExportData) => {
  try {
    const jsonData = {
      metadata: {
        id: data.id,
        timestamp: data.timestamp,
        exportDate: new Date().toISOString(),
        format: "json",
      },
      analysis: {
        sequence: data.sequence,
        results: data.results,
        notes: data.notes || null,
      },
    }

    const jsonString = JSON.stringify(jsonData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    downloadFile(blob, `protgps-analysis-${data.id}.json`)
    return true
  } catch (error) {
    console.error("Failed to export JSON:", error)
    return false
  }
}

// Export to CSV
export const exportToCSV = (data: ExportData) => {
  try {
    // Define CSV headers and rows
    const headers = [
      "Analysis ID",
      "Timestamp",
      "Sequence",
      "Location",
      "Confidence",
      "Compartments",
      "Interactions",
      "Signals",
      "Notes",
    ]

    const values = [
      data.id,
      data.timestamp,
      data.sequence,
      data.results.location,
      data.results.confidence,
      data.results.compartments.join(";"),
      data.results.interactions,
      data.results.signals,
      data.notes || "",
    ]

    // Create CSV content with proper escaping
    const csvContent = [
      headers.join(","),
      values.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    downloadFile(blob, `protgps-analysis-${data.id}.csv`)
    return true
  } catch (error) {
    console.error("Failed to export CSV:", error)
    return false
  }
}

// Export to plain text
export const exportToText = (data: ExportData) => {
  try {
    const content = `
ProtGPS Analysis Report
======================

Analysis ID: ${data.id}
Generated: ${new Date().toLocaleString()}
Original Analysis: ${new Date(data.timestamp).toLocaleString()}

Protein Sequence
--------------
${formatSequence(data.sequence)}

Analysis Results
--------------
Location: ${data.results.location}
Confidence: ${data.results.confidence}
Compartments: ${data.results.compartments.join(", ")}

Detailed Findings
---------------
Interactions: ${data.results.interactions}
Signals: ${data.results.signals}

${data.notes ? `\nNotes\n-----\n${data.notes}` : ""}

Generated by ProtGPS Analysis Platform
https://protgps.research.org
`.trim()

    const blob = new Blob([content], { type: "text/plain" })
    downloadFile(blob, `protgps-analysis-${data.id}.txt`)
    return true
  } catch (error) {
    console.error("Failed to export text:", error)
    return false
  }
}

// Helper function to format sequence with line breaks
const formatSequence = (sequence: string) => {
  return sequence.match(/.{1,60}/g)?.join("\n") || sequence
}

// Helper function to trigger file download
const downloadFile = (blob: Blob, filename: string) => {
  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob)

  // Create a temporary link element
  const link = document.createElement("a")
  link.href = url
  link.download = filename

  // Append to document, click, and cleanup
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Release the blob URL
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

