"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GitHubIcon, TwitterIcon } from "@/components/icons"

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="absolute h-3 w-3 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-lg">BetterUptime</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Powerful monitoring for your websites, APIs, and services. Get alerted when your systems go down.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <GitHubIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/status-page" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Status Page</Link></li>
              <li><Link href="/integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</Link></li>
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BetterUptime. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer