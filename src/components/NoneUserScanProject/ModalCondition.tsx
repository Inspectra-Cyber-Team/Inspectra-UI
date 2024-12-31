'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GitBranch, SearchCode, FileSpreadsheet, Save } from 'lucide-react'

interface ScanStepsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  startButtonText?: string
  onStart: () => void
}

export function ScanStepsModal({
  isOpen,
  onOpenChange,
  title = "Scan Process",
  startButtonText = "Start Scan",
  onStart
}: ScanStepsModalProps) {
  const router = useRouter()

  const steps = [
    { icon: GitBranch, title: "Upload", description: "Upload your Git project URL and we will analyze your repository structure and contents." },
    { icon: SearchCode, title: "Scan", description: "We will find weakness, vulnerabilities and security issues inside your project." },
    { icon: FileSpreadsheet, title: "Report", description: "You will get detail report about your code quality and suggest improvements." },
    { icon: Save, title: "Export", description: "You can seamlessly export the results of your project as a PDF for easy sharing." },
  ]

  const handleClose = () => {
    router.push('/')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[90%] md:max-w-md lg:max-w-lg mx-auto h-min p-5 md:p-5 rounded-md">
        <DialogHeader>
          <DialogTitle className='text-text_title_20'>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="my-6 space-y-11">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 relative">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary_color flex items-center justify-center z-10">
                <step.icon className="w-8 h-8 text-text_color_light" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-foreground text-text_body_16">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-14 left-[9px] w-0.5 h-10 bg-foreground/20 -z-10" />
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button className='bg-primary_color text-text_color_light' onClick={onStart}>
            {startButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

