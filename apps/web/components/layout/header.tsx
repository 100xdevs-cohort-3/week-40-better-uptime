"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="absolute h-4 w-4 bg-white rounded-full"></div>
          </div>
          <span className="font-bold text-xl">BetterUptime</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Pricing
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
          <Button variant="ghost" className="text-sm">
            Log in
          </Button>
          <Button variant="default" className="text-sm">
            Get started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/features" 
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/docs" 
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium p-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="flex items-center justify-between pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="px-2"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
                <Button variant="default" size="sm">
                  Get started
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header