"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { WaitlistForm } from "@/components/waitlist-form"
import { Globe, Users, Sparkles } from "lucide-react"

function WaitlistContent() {
  const searchParams = useSearchParams()
  const referredBy = searchParams.get("ref")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mb-6">
            <Globe className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Discover Your Next Adventure
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of travelers on our exclusive waitlist and be the first to experience a revolutionary way to explore the world.
          </p>

          <WaitlistForm referredBy={referredBy || undefined} />
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Experiences</h3>
            <p className="text-gray-600">
              Access hand-picked destinations and authentic local experiences tailored to your interests.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Travel Community</h3>
            <p className="text-gray-600">
              Connect with like-minded explorers and share your adventures with a passionate community.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
              <Globe className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Seamless Planning</h3>
            <p className="text-gray-600">
              Plan your entire trip in one place with smart recommendations and real-time updates.
            </p>
          </div>
        </section>

        <section className="mt-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don&apos;t miss out on exclusive early access perks and special offers.
          </p>
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-lg mb-4">
                Join our growing community of adventurers
              </p>
              <a
                href="#top"
                className="inline-block bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-24 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Travel Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <WaitlistContent />
    </Suspense>
  )
}
