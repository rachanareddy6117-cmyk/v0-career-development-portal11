"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SGAAssistant } from "@/components/sga-assistant"
import { 
  Newspaper, 
  Rocket, 
  FlaskConical, 
  Building2, 
  Clock, 
  ExternalLink, 
  Search,
  Filter
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const domains = [
  { id: "tech", name: "Technology", icon: Rocket },
  { id: "ai", name: "AI & ML", icon: FlaskConical },
  { id: "business", name: "Business", icon: Building2 },
  { id: "startup", name: "Startups", icon: Newspaper },
]

const categories = [
  { id: "research", name: "Research", color: "primary" },
  { id: "launches", name: "Launches", color: "secondary" },
  { id: "startups", name: "Startups", color: "accent" },
  { id: "business", name: "Business", color: "primary" },
]

const newsItems = [
  {
    id: 1,
    title: "OpenAI Announces GPT-5 with Enhanced Reasoning Capabilities",
    category: "launches",
    domain: "ai",
    time: "2 hours ago",
    summary: "The next generation language model promises 10x improvement in logical reasoning and reduced hallucinations.",
    source: "TechCrunch"
  },
  {
    id: 2,
    title: "New Study Reveals Breakthrough in Quantum Computing Error Correction",
    category: "research",
    domain: "tech",
    time: "5 hours ago",
    summary: "Researchers at MIT have developed a novel approach to quantum error correction that could make practical quantum computers viable.",
    source: "Nature"
  },
  {
    id: 3,
    title: "Startup Raises $50M for Sustainable Battery Technology",
    category: "startups",
    domain: "startup",
    time: "1 day ago",
    summary: "GreenCell Technologies secures Series B funding to scale production of biodegradable batteries.",
    source: "Forbes"
  },
  {
    id: 4,
    title: "Amazon Web Services Launches New AI-Powered Development Tools",
    category: "launches",
    domain: "tech",
    time: "1 day ago",
    summary: "AWS introduces CodeWhisperer Pro and enhanced SageMaker features for enterprise developers.",
    source: "AWS Blog"
  },
  {
    id: 5,
    title: "Global Tech Industry Reports Record Growth in Q4 2025",
    category: "business",
    domain: "business",
    time: "2 days ago",
    summary: "Technology sector revenues reach $2.5 trillion with AI and cloud services leading the growth.",
    source: "Bloomberg"
  },
  {
    id: 6,
    title: "Stanford Researchers Develop AI That Can Predict Protein Structures in Minutes",
    category: "research",
    domain: "ai",
    time: "3 days ago",
    summary: "New algorithm outperforms existing methods and could accelerate drug discovery significantly.",
    source: "Science Daily"
  },
  {
    id: 7,
    title: "Fintech Startup Disrupts Traditional Banking with AI-First Approach",
    category: "startups",
    domain: "startup",
    time: "3 days ago",
    summary: "NeoBank AI launches with automated financial planning and zero-fee international transfers.",
    source: "TechCrunch"
  },
  {
    id: 8,
    title: "Apple Announces Vision Pro 2 with Advanced Spatial Computing Features",
    category: "launches",
    domain: "tech",
    time: "4 days ago",
    summary: "The next generation headset promises 4K per eye resolution and 8-hour battery life.",
    source: "The Verge"
  },
]

export default function VisionPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNews = newsItems.filter(item => {
    if (selectedDomain && item.domain !== selectedDomain) return false
    if (selectedCategory && item.category !== selectedCategory) return false
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getCategoryColor = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId)
    return cat?.color || "primary"
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Newspaper className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-medium">Change Your Vision</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Stay Updated with Latest Trends
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the latest research, product launches, startup news, and business 
              updates from your chosen domains.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Domain Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedDomain === null ? "default" : "outline"}
                onClick={() => setSelectedDomain(null)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" /> All Domains
              </Button>
              {domains.map((domain) => (
                <Button
                  key={domain.id}
                  variant={selectedDomain === domain.id ? "default" : "outline"}
                  onClick={() => setSelectedDomain(domain.id)}
                  className="gap-2"
                >
                  <domain.icon className="w-4 h-4" />
                  {domain.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All Updates
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? `bg-${cat.color} text-${cat.color}-foreground`
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* News Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.map((item) => (
                <Card key={item.id} className="bg-card border-border hover:border-primary/30 transition-all group">
                  <CardContent className="p-6">
                    {/* Category & Time */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(item.category)}/20 text-${getCategoryColor(item.category)}`}>
                        {categories.find(c => c.id === item.category)?.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.summary}
                    </p>

                    {/* Source & Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.source}</span>
                      <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                        Read More <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </CardContent>
            </Card>
          )}

          {/* Load More */}
          {filteredNews.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="gap-2">
                Load More Updates
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <SGAAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
