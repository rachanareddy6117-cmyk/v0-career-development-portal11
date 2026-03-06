"use client"

import { useState, useRef } from "react"
import { 
  ArrowLeft, 
  ArrowRight,
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Share2, 
  Printer,
  CheckCircle,
  User,
  GraduationCap,
  Briefcase,
  Sparkles,
  Palette,
  Mail,
  Phone,
  Linkedin,
  Globe,
  ExternalLink,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ResumeBuilderProps {
  onBack: () => void
}

interface ResumeData {
  style: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    linkedin: string
    portfolio: string
  }
  education: { institution: string; degree: string; field: string; startYear: string; endYear: string; grade: string }[]
  experience: { company: string; role: string; startDate: string; endDate: string; description: string; current: boolean }[]
  skills: string[]
  interests: string[]
}

const steps = [
  { id: 1, title: "Personal", icon: User, description: "Your contact information" },
  { id: 2, title: "Education", icon: GraduationCap, description: "Academic background" },
  { id: 3, title: "Experience", icon: Briefcase, description: "Work history (optional)" },
  { id: 4, title: "Skills", icon: Sparkles, description: "Skills & interests" },
  { id: 5, title: "Template", icon: Palette, description: "Choose your style" },
  { id: 6, title: "Download", icon: Download, description: "Get your resume" },
]

// Professional resume templates inspired by popular online platforms
const resumeTemplates = [
  { 
    id: "minimalist", 
    name: "Minimalist", 
    description: "Clean and simple design inspired by Canva",
    source: "Canva Style",
    colors: { primary: "#1a1a1a", secondary: "#4a4a4a", accent: "#f5f5f5", highlight: "#000000" }
  },
  { 
    id: "professional", 
    name: "Professional", 
    description: "Corporate look inspired by Resume.io",
    source: "Resume.io Style",
    colors: { primary: "#1e3a5f", secondary: "#2c5282", accent: "#ebf8ff", highlight: "#1e3a5f" }
  },
  { 
    id: "modern", 
    name: "Modern", 
    description: "Contemporary design from Novoresume",
    source: "Novoresume Style",
    colors: { primary: "#2563eb", secondary: "#3b82f6", accent: "#dbeafe", highlight: "#1d4ed8" }
  },
  { 
    id: "elegant", 
    name: "Elegant", 
    description: "Sophisticated style from Zety",
    source: "Zety Style",
    colors: { primary: "#374151", secondary: "#6b7280", accent: "#f9fafb", highlight: "#111827" }
  },
  { 
    id: "creative", 
    name: "Creative", 
    description: "Bold design inspired by VisualCV",
    source: "VisualCV Style",
    colors: { primary: "#7c3aed", secondary: "#8b5cf6", accent: "#ede9fe", highlight: "#6d28d9" }
  },
  { 
    id: "executive", 
    name: "Executive", 
    description: "Premium look from ResumeGenius",
    source: "ResumeGenius Style",
    colors: { primary: "#0f766e", secondary: "#14b8a6", accent: "#ccfbf1", highlight: "#0d9488" }
  },
]

export function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const [step, setStep] = useState(1)
  const resumeRef = useRef<HTMLDivElement>(null)
  const [resumeData, setResumeData] = useState<ResumeData>({
    style: "professional",
    personalInfo: { fullName: "", email: "", phone: "", linkedin: "", portfolio: "" },
    education: [{ institution: "", degree: "", field: "", startYear: "", endYear: "", grade: "" }],
    experience: [{ company: "", role: "", startDate: "", endDate: "", description: "", current: false }],
    skills: [""],
    interests: [""],
  })

  const totalSteps = 6

  const handlePersonalInfoChange = (field: keyof ResumeData["personalInfo"], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", field: "", startYear: "", endYear: "", grade: "" }]
    }))
  }

  const removeEducation = (index: number) => {
    if (resumeData.education.length > 1) {
      setResumeData(prev => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      }))
    }
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setResumeData(prev => ({ ...prev, education: newEducation }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", startDate: "", endDate: "", description: "", current: false }]
    }))
  }

  const removeExperience = (index: number) => {
    if (resumeData.experience.length > 1) {
      setResumeData(prev => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index)
      }))
    }
  }

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const newExperience = [...resumeData.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setResumeData(prev => ({ ...prev, experience: newExperience }))
  }

  const addSkill = () => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, ""] }))
  }

  const removeSkill = (index: number) => {
    if (resumeData.skills.length > 1) {
      setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
    }
  }

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resumeData.skills]
    newSkills[index] = value
    setResumeData(prev => ({ ...prev, skills: newSkills }))
  }

  const addInterest = () => {
    setResumeData(prev => ({ ...prev, interests: [...prev.interests, ""] }))
  }

  const removeInterest = (index: number) => {
    if (resumeData.interests.length > 1) {
      setResumeData(prev => ({ ...prev, interests: prev.interests.filter((_, i) => i !== index) }))
    }
  }

  const updateInterest = (index: number, value: string) => {
    const newInterests = [...resumeData.interests]
    newInterests[index] = value
    setResumeData(prev => ({ ...prev, interests: newInterests }))
  }

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return
    
    const html2pdf = (await import('html2pdf.js')).default
    
    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName || 'resume'}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(resumeRef.current).save()
  }

  const handlePrint = () => {
    if (!resumeRef.current) return
    
    const printContent = resumeRef.current.innerHTML
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: system-ui, -apple-system, sans-serif; }
              @media print {
                body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
              }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.fullName}'s Resume`,
          text: 'Check out my professional resume!',
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      alert('Share feature is not supported on this browser. You can download and share the PDF instead.')
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone
      case 2:
        return resumeData.education.some(edu => edu.institution && edu.degree)
      case 3:
        return true // Experience is optional
      case 4:
        return resumeData.skills.some(skill => skill.trim() !== "")
      case 5:
        return resumeData.style !== null
      default:
        return true
    }
  }

  const getSelectedTemplate = () => {
    return resumeTemplates.find(t => t.id === resumeData.style) || resumeTemplates[1]
  }

  const renderResumePreview = () => {
    const template = getSelectedTemplate()
    
    switch (resumeData.style) {
      case 'minimalist':
        return (
          <div className="p-10" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <div className="mb-8">
              <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                {resumeData.personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                {resumeData.personalInfo.portfolio && <span>{resumeData.personalInfo.portfolio}</span>}
              </div>
            </div>
            
            <div className="h-px bg-gray-200 mb-8" />
            
            {resumeData.education.some(edu => edu.institution) && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
                {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{edu.institution}</span>
                      <span className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</span>
                    </div>
                    <div className="text-gray-600 text-sm">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                    {edu.grade && <div className="text-gray-400 text-sm">{edu.grade}</div>}
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.experience.some(exp => exp.company) && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
                {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{exp.role}</span>
                      <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-gray-600 text-sm">{exp.company}</div>
                    {exp.description && <p className="text-gray-500 text-sm mt-2">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.skills.some(skill => skill) && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
                <p className="text-gray-700">{resumeData.skills.filter(s => s).join(' / ')}</p>
              </div>
            )}
            
            {resumeData.interests.some(interest => interest) && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Interests</h2>
                <p className="text-gray-700">{resumeData.interests.filter(i => i).join(' / ')}</p>
              </div>
            )}
          </div>
        )

      case 'professional':
        return (
          <div style={{ fontFamily: 'Georgia, serif' }}>
            <div className="bg-[#1e3a5f] text-white p-8">
              <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                {resumeData.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {resumeData.personalInfo.linkedin}</span>}
                {resumeData.personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {resumeData.personalInfo.portfolio}</span>}
              </div>
            </div>
            
            <div className="p-8">
              {resumeData.education.some(edu => edu.institution) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-4">EDUCATION</h2>
                  {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between">
                        <strong className="text-gray-900">{edu.institution}</strong>
                        <span className="text-gray-600">{edu.startYear} - {edu.endYear}</span>
                      </div>
                      <div className="text-gray-700">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                      {edu.grade && <div className="text-gray-500 text-sm">{edu.grade}</div>}
                    </div>
                  ))}
                </div>
              )}
              
              {resumeData.experience.some(exp => exp.company) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-4">EXPERIENCE</h2>
                  {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between">
                        <strong className="text-gray-900">{exp.role}</strong>
                        <span className="text-gray-600">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="text-gray-700 italic">{exp.company}</div>
                      {exp.description && <p className="text-gray-600 mt-1 text-sm">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}
              
              {resumeData.skills.some(skill => skill) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-4">SKILLS</h2>
                  <p className="text-gray-700">{resumeData.skills.filter(s => s).join(' • ')}</p>
                </div>
              )}
              
              {resumeData.interests.some(interest => interest) && (
                <div>
                  <h2 className="text-lg font-bold text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1 mb-4">INTERESTS</h2>
                  <p className="text-gray-700">{resumeData.interests.filter(i => i).join(' • ')}</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'modern':
        return (
          <div style={{ fontFamily: 'system-ui, sans-serif' }}>
            <div className="bg-blue-600 text-white p-8">
              <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                {resumeData.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {resumeData.personalInfo.linkedin}</span>}
                {resumeData.personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {resumeData.personalInfo.portfolio}</span>}
              </div>
            </div>
            
            <div className="p-8">
              {resumeData.education.some(edu => edu.institution) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" /> Education
                  </h2>
                  {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
                    <div key={index} className="mb-3 pl-4 border-l-2 border-blue-200">
                      <div className="font-semibold text-gray-900">{edu.institution}</div>
                      <div className="text-gray-700">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                      <div className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}{edu.grade && ` | ${edu.grade}`}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {resumeData.experience.some(exp => exp.company) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" /> Experience
                  </h2>
                  {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                    <div key={index} className="mb-3 pl-4 border-l-2 border-blue-200">
                      <div className="font-semibold text-gray-900">{exp.role}</div>
                      <div className="text-gray-700">{exp.company}</div>
                      <div className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</div>
                      {exp.description && <p className="text-gray-600 mt-1 text-sm">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}
              
              {resumeData.skills.some(skill => skill) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.filter(s => s).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {resumeData.interests.some(interest => interest) && (
                <div>
                  <h2 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.interests.filter(i => i).map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 'elegant':
        return (
          <div className="p-10" style={{ fontFamily: 'Georgia, serif' }}>
            <div className="text-center mb-8 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-normal text-gray-800 mb-3 tracking-wide">
                {resumeData.personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-gray-500">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                {resumeData.personalInfo.portfolio && <span>{resumeData.personalInfo.portfolio}</span>}
              </div>
            </div>
            
            {resumeData.education.some(edu => edu.institution) && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">Education</h2>
                {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
                  <div key={index} className="mb-4 text-center">
                    <div className="font-medium text-gray-800">{edu.institution}</div>
                    <div className="text-gray-600">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                    <div className="text-sm text-gray-400">{edu.startYear} - {edu.endYear}{edu.grade && ` | ${edu.grade}`}</div>
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.experience.some(exp => exp.company) && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">Experience</h2>
                {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                  <div key={index} className="mb-4 text-center">
                    <div className="font-medium text-gray-800">{exp.role}</div>
                    <div className="text-gray-600 italic">{exp.company}</div>
                    <div className="text-sm text-gray-400">{exp.startDate} - {exp.endDate}</div>
                    {exp.description && <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.skills.some(skill => skill) && (
              <div className="mb-8 text-center">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">Skills</h2>
                <p className="text-gray-700">{resumeData.skills.filter(s => s).join('  |  ')}</p>
              </div>
            )}
            
            {resumeData.interests.some(interest => interest) && (
              <div className="text-center">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">Interests</h2>
                <p className="text-gray-700">{resumeData.interests.filter(i => i).join('  |  ')}</p>
              </div>
            )}
          </div>
        )

      case 'creative':
        return (
          <div className="flex" style={{ fontFamily: 'system-ui, sans-serif', minHeight: '11in' }}>
            <div className="w-1/3 bg-purple-700 text-white p-6">
              <div className="mb-8">
                <div className="w-24 h-24 rounded-full bg-purple-500 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                  {resumeData.personalInfo.fullName?.charAt(0) || 'N'}
                </div>
                <h1 className="text-xl font-bold text-center">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-3">Contact</h3>
                <div className="space-y-2 text-sm">
                  {resumeData.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" /><span className="break-all">{resumeData.personalInfo.email}</span></div>}
                  {resumeData.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /><span>{resumeData.personalInfo.phone}</span></div>}
                  {resumeData.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-3 h-3" /><span className="break-all">{resumeData.personalInfo.linkedin}</span></div>}
                  {resumeData.personalInfo.portfolio && <div className="flex items-center gap-2"><Globe className="w-3 h-3" /><span className="break-all">{resumeData.personalInfo.portfolio}</span></div>}
                </div>
              </div>
              
              {resumeData.skills.some(skill => skill) && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-3">Skills</h3>
                  <div className="space-y-2">
                    {resumeData.skills.filter(s => s).map((skill, index) => (
                      <div key={index} className="text-sm">
                        <span>{skill}</span>
                        <div className="h-1 bg-purple-500 rounded-full mt-1">
                          <div className="h-full bg-white rounded-full" style={{ width: '80%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {resumeData.interests.some(interest => interest) && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.interests.filter(i => i).map((interest, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-600 rounded text-xs">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-2/3 p-6">
              {resumeData.education.some(edu => edu.institution) && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-purple-700 mb-3 pb-1 border-b-2 border-purple-200">Education</h2>
                  {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{edu.institution}</div>
                          <div className="text-gray-700 text-sm">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                        </div>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{edu.startYear} - {edu.endYear}</span>
                      </div>
                      {edu.grade && <div className="text-sm text-gray-500 mt-1">{edu.grade}</div>}
                    </div>
                  ))}
                </div>
              )}
              
              {resumeData.experience.some(exp => exp.company) && (
                <div>
                  <h2 className="text-lg font-bold text-purple-700 mb-3 pb-1 border-b-2 border-purple-200">Experience</h2>
                  {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{exp.role}</div>
                          <div className="text-gray-700 text-sm">{exp.company}</div>
                        </div>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      {exp.description && <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 'executive':
        return (
          <div style={{ fontFamily: 'system-ui, sans-serif' }}>
            <div className="bg-teal-700 text-white p-8">
              <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-teal-100">
                {resumeData.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {resumeData.personalInfo.linkedin}</span>}
                {resumeData.personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {resumeData.personalInfo.portfolio}</span>}
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  {resumeData.experience.some(exp => exp.company) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" /> Professional Experience
                      </h2>
                      {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                        <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-gray-900">{exp.role}</span>
                            <span className="text-sm text-teal-600 font-medium">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <div className="text-gray-600 mb-2">{exp.company}</div>
                          {exp.description && <p className="text-gray-500 text-sm">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {resumeData.education.some(edu => edu.institution) && (
                    <div>
                      <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" /> Education
                      </h2>
                      {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex justify-between items-start">
                            <span className="font-semibold text-gray-900">{edu.institution}</span>
                            <span className="text-sm text-teal-600">{edu.startYear} - {edu.endYear}</span>
                          </div>
                          <div className="text-gray-600">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                          {edu.grade && <div className="text-gray-400 text-sm">{edu.grade}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg h-fit">
                  {resumeData.skills.some(skill => skill) && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-3">Skills</h3>
                      <div className="space-y-2">
                        {resumeData.skills.filter(s => s).map((skill, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <Check className="w-3 h-3 text-teal-600" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {resumeData.interests.some(interest => interest) && (
                    <div>
                      <h3 className="text-sm font-bold text-teal-700 uppercase tracking-wider mb-3">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.interests.filter(i => i).map((interest, index) => (
                          <span key={index} className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-teal-200">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}: {steps[step - 1].description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step > s.id 
                      ? "bg-primary text-primary-foreground" 
                      : step === s.id 
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20" 
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 hidden sm:block ${step >= s.id ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > s.id ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
                <p className="text-muted-foreground">Enter your contact details</p>
              </div>
              
              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Mobile Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/johndoe"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Portfolio (Optional)
                      </Label>
                      <Input
                        id="portfolio"
                        placeholder="johndoe.com"
                        value={resumeData.personalInfo.portfolio}
                        onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Education */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Educational Details</h2>
                <p className="text-muted-foreground">Add your academic qualifications</p>
              </div>
              
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-foreground flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Education {index + 1}
                        </h3>
                        {resumeData.education.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeEducation(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Institution Name *</Label>
                          <Input
                            placeholder="University or College Name"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Degree *</Label>
                            <Input
                              placeholder="Bachelor's, Master's, etc."
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, "degree", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                              placeholder="Computer Science, Business, etc."
                              value={edu.field}
                              onChange={(e) => updateEducation(index, "field", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Start Year</Label>
                            <Input
                              placeholder="2018"
                              value={edu.startYear}
                              onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Year</Label>
                            <Input
                              placeholder="2022"
                              value={edu.endYear}
                              onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Grade/GPA</Label>
                            <Input
                              placeholder="3.8 GPA"
                              value={edu.grade}
                              onChange={(e) => updateEducation(index, "grade", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="outline" onClick={addEducation} className="w-full gap-2">
                  <Plus className="w-4 h-4" /> Add Another Education
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Work Experience</h2>
                <p className="text-muted-foreground">Add your professional experience (optional)</p>
              </div>
              
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-foreground flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Experience {index + 1}
                        </h3>
                        {resumeData.experience.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeExperience(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                              placeholder="Company Inc."
                              value={exp.company}
                              onChange={(e) => updateExperience(index, "company", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Job Title / Role</Label>
                            <Input
                              placeholder="Software Engineer"
                              value={exp.role}
                              onChange={(e) => updateExperience(index, "role", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              placeholder="Jan 2020"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              placeholder="Present or Dec 2023"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                              disabled={exp.current}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`current-${index}`}
                            checked={exp.current}
                            onChange={(e) => {
                              updateExperience(index, "current", e.target.checked)
                              if (e.target.checked) {
                                updateExperience(index, "endDate", "Present")
                              }
                            }}
                            className="rounded border-border"
                          />
                          <Label htmlFor={`current-${index}`} className="text-sm cursor-pointer">
                            I currently work here
                          </Label>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            value={exp.description}
                            onChange={(e) => updateExperience(index, "description", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button variant="outline" onClick={addExperience} className="w-full gap-2">
                  <Plus className="w-4 h-4" /> Add Another Experience
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Skills & Interests */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Skills & Interests</h2>
                <p className="text-muted-foreground">Highlight your abilities and passions</p>
              </div>
              
              {/* Skills */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Skills *
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-1 bg-muted rounded-full pl-3 pr-1 py-1">
                        <Input
                          placeholder="Add skill"
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          className="border-0 bg-transparent h-6 w-24 p-0 focus-visible:ring-0"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={addSkill} className="gap-1 rounded-full">
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Examples: JavaScript, Project Management, Communication, Python, Leadership
                  </p>
                </CardContent>
              </Card>
              
              {/* Interests */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Interests
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.interests.map((interest, index) => (
                      <div key={index} className="flex items-center gap-1 bg-muted rounded-full pl-3 pr-1 py-1">
                        <Input
                          placeholder="Add interest"
                          value={interest}
                          onChange={(e) => updateInterest(index, e.target.value)}
                          className="border-0 bg-transparent h-6 w-24 p-0 focus-visible:ring-0"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeInterest(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={addInterest} className="gap-1 rounded-full">
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Examples: Reading, Traveling, Photography, Open Source, Gaming
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Template Selection */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Template</h2>
                <p className="text-muted-foreground">Select a professional design inspired by top resume platforms</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      resumeData.style === template.id 
                        ? "ring-2 ring-primary border-primary" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setResumeData(prev => ({ ...prev, style: template.id }))}
                  >
                    <CardContent className="p-4">
                      {/* Template Preview */}
                      <div 
                        className="aspect-[3/4] rounded-lg mb-3 relative overflow-hidden border border-border"
                        style={{ backgroundColor: '#f8f9fa' }}
                      >
                        <div className="absolute inset-0 p-2">
                          <div className="h-full bg-white rounded shadow-sm overflow-hidden">
                            {/* Mini preview based on template */}
                            <div 
                              className="h-6"
                              style={{ backgroundColor: template.colors.primary }}
                            />
                            <div className="p-2">
                              <div 
                                className="h-2 rounded mb-1.5"
                                style={{ backgroundColor: template.colors.primary, width: '50%' }}
                              />
                              <div className="h-1 bg-gray-200 rounded mb-0.5 w-full" />
                              <div className="h-1 bg-gray-200 rounded mb-0.5 w-4/5" />
                              <div className="h-1 bg-gray-200 rounded mb-2 w-3/5" />
                              
                              <div 
                                className="h-1.5 rounded mb-1"
                                style={{ backgroundColor: template.colors.secondary, width: '35%' }}
                              />
                              <div className="h-0.5 bg-gray-100 rounded mb-0.5 w-full" />
                              <div className="h-0.5 bg-gray-100 rounded mb-0.5 w-full" />
                              <div className="h-0.5 bg-gray-100 rounded mb-2 w-3/4" />
                              
                              <div 
                                className="h-1.5 rounded mb-1"
                                style={{ backgroundColor: template.colors.secondary, width: '35%' }}
                              />
                              <div className="h-0.5 bg-gray-100 rounded mb-0.5 w-full" />
                              <div className="h-0.5 bg-gray-100 rounded w-4/5" />
                            </div>
                          </div>
                        </div>
                        
                        {resumeData.style === template.id && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{template.name}</h3>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {template.source}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Preview & Download */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your Resume is Ready!</h2>
                <p className="text-muted-foreground">Download, share, or print your professional resume</p>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Button onClick={handleDownloadPDF} className="gap-2 h-14" size="lg">
                  <Download className="w-5 h-5" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2 h-14" size="lg">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
                <Button variant="outline" onClick={handlePrint} className="gap-2 h-14" size="lg">
                  <Printer className="w-5 h-5" />
                  Print
                </Button>
              </div>
              
              {/* Resume Preview */}
              <Card className="border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted p-4 border-b border-border flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Resume Preview</span>
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded">
                      {getSelectedTemplate().name} Template
                    </span>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-900">
                    <div 
                      ref={resumeRef}
                      className="bg-white shadow-lg mx-auto"
                      style={{ width: '100%', maxWidth: '8.5in', minHeight: '11in' }}
                    >
                      {renderResumePreview()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pb-8">
            <Button 
              variant="outline" 
              onClick={() => setStep(Math.max(1, step - 1))} 
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {step < totalSteps ? (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2"
              >
                {step === 5 ? "Finish" : "Next"} <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={onBack} variant="outline">
                Create Another Resume
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
