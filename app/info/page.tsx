"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InfoPage() {
  return (
    <>
      <Header currentSection="info" />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            VERTEX Athletic Product Guide: Find Your Perfect Shoe
          </h1>
          
          {/* Executive Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide matches VERTEX Athletic footwear to specific customer profiles based on demographics, psychographics, geographic locations, and intended use. Each shoe in our collection is engineered for specific performance needs and lifestyle preferences.
            </p>
          </div>

          {/* Men's Collection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">🏃‍♂️</span> MEN&apos;S COLLECTION
            </h2>
            
            <div className="space-y-8">
              {/* Summit Pro */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">1. Summit Pro - The Peak Performer</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $220</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 25-45, household income $75K+, college-educated</li>
                      <li><strong>Psychographics:</strong> Achievement-oriented, data-driven, early adopters of technology</li>
                      <li><strong>Geographic:</strong> Mountain states (Colorado, Utah, Washington), Pacific Northwest</li>
                      <li><strong>Activity:</strong> Technical trail running, ultra-marathons, mountain racing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Carbon fiber plate provides energy return for long-distance efficiency</li>
                      <li>Advanced traction for technical terrain</li>
                      <li>Lightweight despite maximum protection</li>
                      <li>Appeals to those who track every metric and demand peak performance</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Serious trail runners competing in races or pursuing FKTs (Fastest Known Times)
                </p>
              </div>

              {/* Urban Forge */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">2. Urban Forge - The Eco-Conscious Commuter</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $145</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 22-40, urban professionals, millennials/Gen Z</li>
                      <li><strong>Psychographics:</strong> Environmentally conscious, values sustainability over price</li>
                      <li><strong>Geographic:</strong> Major cities (NYC, SF, Portland, Seattle, Austin)</li>
                      <li><strong>Activity:</strong> Daily commute, casual wear, light gym use</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Made from 100% recycled materials</li>
                      <li>Versatile style transitions from office to after-work activities</li>
                      <li>Comfortable for all-day wear</li>
                      <li>Visible sustainability appeals to values-driven consumers</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Eco-conscious urbanites who want style and sustainability
                </p>
              </div>

              {/* Apex Runner */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">3. Apex Runner - The Speed Demon</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $185</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 20-35, competitive athletes, runners</li>
                      <li><strong>Psychographics:</strong> Performance-obsessed, goal-oriented, disciplined</li>
                      <li><strong>Geographic:</strong> Running hotspots (Boston, Chicago, Eugene)</li>
                      <li><strong>Activity:</strong> Road racing, track workouts, marathon training</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Lightweight racing flat design</li>
                      <li>Responsive cushioning for speed work</li>
                      <li>Breathable for hot conditions</li>
                      <li>Professional-grade performance at sub-elite price point</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Competitive runners chasing PRs on road and track
                </p>
              </div>

              {/* Terra Guide */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">4. Terra Guide - The Weekend Warrior</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $165</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 30-55, middle income, family-oriented</li>
                      <li><strong>Psychographics:</strong> Work-life balance seekers, outdoor enthusiasts but not extreme</li>
                      <li><strong>Geographic:</strong> Suburban areas near outdoor recreation</li>
                      <li><strong>Activity:</strong> Weekend hikes, camping trips, dog walking</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Durable construction for varied terrain</li>
                      <li>Comfortable for long days on feet</li>
                      <li>Versatile for multiple activities</li>
                      <li>Great value for occasional adventurers</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Weekend hikers and casual outdoor enthusiasts
                </p>
              </div>

              {/* Velocity Core */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">5. Velocity Core - The Gym Enthusiast</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $135</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 18-35, fitness-focused, social media active</li>
                      <li><strong>Psychographics:</strong> Image-conscious, trendy, community-oriented</li>
                      <li><strong>Geographic:</strong> Urban and suburban areas with strong gym culture</li>
                      <li><strong>Activity:</strong> CrossFit, HIIT, weight training, group fitness</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Stable platform for lifting</li>
                      <li>Flexible for dynamic movements</li>
                      <li>Stylish design for social media</li>
                      <li>Affordable for younger demographics</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Gym-goers who need versatility for various workouts
                </p>
              </div>

              {/* Storm Shield */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">6. Storm Shield - The All-Weather Athlete</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $195</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 25-50, lives in challenging climates</li>
                      <li><strong>Psychographics:</strong> Dedicated, refuses to let weather stop them</li>
                      <li><strong>Geographic:</strong> Pacific Northwest, Northeast, Canada</li>
                      <li><strong>Activity:</strong> Year-round running/hiking in all conditions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Waterproof yet breathable</li>
                      <li>Enhanced traction for wet/icy conditions</li>
                      <li>Reflective elements for dark conditions</li>
                      <li>Premium materials justify higher price</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Dedicated athletes who train regardless of weather
                </p>
              </div>

              {/* Elevate Max */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">7. Elevate Max - The Comfort Seeker</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $155</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 35-65, experiencing joint issues, heavier runners</li>
                      <li><strong>Psychographics:</strong> Prioritizes comfort and injury prevention</li>
                      <li><strong>Geographic:</strong> Nationwide, especially aging populations (Florida, Arizona)</li>
                      <li><strong>Activity:</strong> Easy runs, walking, standing for long periods</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Maximum cushioning for joint protection</li>
                      <li>Wide toe box option available</li>
                      <li>Supportive for overpronators</li>
                      <li>Doctor-recommended features</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Runners prioritizing comfort and injury prevention
                </p>
              </div>

              {/* Ridge Walker */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">8. Ridge Walker - The Style Maven</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $125</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 18-30, fashion-conscious, students/young professionals</li>
                      <li><strong>Psychographics:</strong> Trendy, social, values aesthetics</li>
                      <li><strong>Geographic:</strong> College towns, trendy urban neighborhoods</li>
                      <li><strong>Activity:</strong> Casual wear, light activities, social outings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Fashion-forward design</li>
                      <li>Multiple colorways</li>
                      <li>Affordable price point</li>
                      <li>Instagram-worthy aesthetics</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young men wanting athletic style without athletic prices
                </p>
              </div>

              {/* Power Stride */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">9. Power Stride - The Strength Athlete</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $145</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 20-40, serious lifters, fitness competitors</li>
                      <li><strong>Psychographics:</strong> Discipline-focused, performance-driven</li>
                      <li><strong>Geographic:</strong> Areas with strong powerlifting/bodybuilding communities</li>
                      <li><strong>Activity:</strong> Powerlifting, Olympic lifting, bodybuilding</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Flat, stable sole for lifting</li>
                      <li>Minimal cushioning for ground feel</li>
                      <li>Durable for heavy loads</li>
                      <li>Strap system for added stability</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Serious strength athletes needing specialized footwear
                </p>
              </div>

              {/* Night Hawk */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">10. Night Hawk - The Dawn Patrol</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $175</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Males 25-45, busy professionals, parents</li>
                      <li><strong>Psychographics:</strong> Time-constrained, safety-conscious, dedicated</li>
                      <li><strong>Geographic:</strong> Urban and suburban areas</li>
                      <li><strong>Activity:</strong> Early morning or evening runs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>360-degree reflectivity</li>
                      <li>High-visibility colorways</li>
                      <li>Comfortable for daily training</li>
                      <li>Safety features justify premium price</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Runners who train in low-light conditions
                </p>
              </div>
            </div>
          </section>

          {/* Women's Collection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">👩</span> WOMEN&apos;S COLLECTION
            </h2>
            
            <div className="space-y-8">
              {/* Luna Rise */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">1. Luna Rise - The Empowered Runner</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $165</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 25-45, professional women, mothers</li>
                      <li><strong>Psychographics:</strong> Balancing multiple roles, values &quot;me time&quot;</li>
                      <li><strong>Geographic:</strong> Suburban areas, family-oriented communities</li>
                      <li><strong>Activity:</strong> Morning runs, stress relief, marathon training</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Women-specific fit and cushioning</li>
                      <li>Supportive for various distances</li>
                      <li>Feminine aesthetic without sacrificing performance</li>
                      <li>Addresses women&apos;s biomechanical needs</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Women serious about running but needing work-life balance
                </p>
              </div>

              {/* Sky Dancer */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">2. Sky Dancer - The Fitness Influencer</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $145</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 18-30, social media active, fitness enthusiasts</li>
                      <li><strong>Psychographics:</strong> Image-conscious, community-driven, trendsetting</li>
                      <li><strong>Geographic:</strong> Major cities, college towns</li>
                      <li><strong>Activity:</strong> Group fitness, running clubs, gym workouts</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Lightweight and responsive</li>
                      <li>Photogenic design and colors</li>
                      <li>Versatile for various activities</li>
                      <li>Trendy without being too expensive</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young women who want performance and style
                </p>
              </div>

              {/* Flora Trail */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">3. Flora Trail - The Nature Lover</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $155</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 25-50, environmentally conscious</li>
                      <li><strong>Psychographics:</strong> Values nature, mindfulness, wellness</li>
                      <li><strong>Geographic:</strong> Near national parks, hiking destinations</li>
                      <li><strong>Activity:</strong> Trail running, hiking, outdoor yoga</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Nature-inspired colorways</li>
                      <li>Eco-friendly materials</li>
                      <li>Excellent grip for trails</li>
                      <li>Supports environmental causes</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Women who find peace and fitness in nature
                </p>
              </div>

              {/* Metro Glide */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">4. Metro Glide - The Urban Professional</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $135</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 25-40, career-focused, city dwellers</li>
                      <li><strong>Psychographics:</strong> Efficiency-minded, polished, busy</li>
                      <li><strong>Geographic:</strong> Major metropolitan areas</li>
                      <li><strong>Activity:</strong> Commuting, lunch-hour workouts, weekend errands</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Sleek design works with athleisure</li>
                      <li>Comfortable for all-day wear</li>
                      <li>Easy to clean</li>
                      <li>Professional enough for casual offices</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Urban women needing one shoe for multiple purposes
                </p>
              </div>

              {/* Zenith Flex */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">5. Zenith Flex - The Wellness Warrior</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $125</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 20-50, yoga practitioners, holistic health focused</li>
                      <li><strong>Psychographics:</strong> Mindful, flexible, wellness-oriented</li>
                      <li><strong>Geographic:</strong> Areas with strong wellness communities (California, Colorado)</li>
                      <li><strong>Activity:</strong> Yoga, Pilates, barre, meditation walks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Flexible sole for natural movement</li>
                      <li>Minimalist design</li>
                      <li>Breathable materials</li>
                      <li>Slip-on convenience</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Women prioritizing mindful movement and flexibility
                </p>
              </div>

              {/* Aurora Run */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">6. Aurora Run - The Sunrise Warrior</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $155</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 30-50, early risers, goal-oriented</li>
                      <li><strong>Psychographics:</strong> Disciplined, inspirational, community leaders</li>
                      <li><strong>Geographic:</strong> Safe suburban neighborhoods</li>
                      <li><strong>Activity:</strong> Early morning runs, leading run groups</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Gradient sunrise colorways</li>
                      <li>Reflective elements for safety</li>
                      <li>Cushioned for daily miles</li>
                      <li>Inspiring design motivates early wake-ups</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Dedicated women who start their day with movement
                </p>
              </div>

              {/* Peak Pursuit */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">7. Peak Pursuit - The Adventure Seeker</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $175</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 25-45, adventurous, travel-oriented</li>
                      <li><strong>Psychographics:</strong> Independent, brave, experience-collectors</li>
                      <li><strong>Geographic:</strong> Mountain regions, adventure destinations</li>
                      <li><strong>Activity:</strong> Hiking, backpacking, adventure racing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Technical features for serious terrain</li>
                      <li>Durable for extended trips</li>
                      <li>Protective yet feminine design</li>
                      <li>Multi-day comfort</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Women who push boundaries in the outdoors
                </p>
              </div>

              {/* Cloud Nine */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">8. Cloud Nine - The Comfort Queen</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $165</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 35-65, comfort-prioritizing, possibly larger sizes</li>
                      <li><strong>Psychographics:</strong> Self-care focused, practical, value-conscious</li>
                      <li><strong>Geographic:</strong> Nationwide</li>
                      <li><strong>Activity:</strong> Walking, easy runs, all-day wear</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Maximum cushioning</li>
                      <li>Wide width options</li>
                      <li>Arch support</li>
                      <li>Proven comfort technology</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Women prioritizing comfort without sacrificing style
                </p>
              </div>

              {/* Stellar Step */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">9. Stellar Step - The Trendsetter</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $135</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 18-30, fashion-forward, social</li>
                      <li><strong>Psychographics:</strong> Trendy, expressive, confident</li>
                      <li><strong>Geographic:</strong> Fashion capitals, college campuses</li>
                      <li><strong>Activity:</strong> Casual wear, light fitness, social activities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Fashion-athletic hybrid</li>
                      <li>Bold colorways and patterns</li>
                      <li>Affordable luxury</li>
                      <li>Social media worthy</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young women expressing themselves through footwear
                </p>
              </div>

              {/* Horizon Lite */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">10. Horizon Lite - The Minimalist</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $115</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Females 25-40, experienced runners, technique-focused</li>
                      <li><strong>Psychographics:</strong> Knowledgeable, natural movement advocates</li>
                      <li><strong>Geographic:</strong> Running-centric communities</li>
                      <li><strong>Activity:</strong> Efficient running form, speed work</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Minimal drop design</li>
                      <li>Lightweight construction</li>
                      <li>Natural foot movement</li>
                      <li>Lower price for minimalist market</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Experienced runners preferring minimal footwear
                </p>
              </div>
            </div>
          </section>

          {/* Children's Collection */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">👶</span> CHILDREN&apos;S COLLECTION
            </h2>
            
            <div className="space-y-8">
              {/* Little Explorer */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">1. Little Explorer - First Steps to Adventure</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $55</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Parents of toddlers 1-3 years</li>
                      <li><strong>Psychographics:</strong> Safety-conscious, outdoor-oriented families</li>
                      <li><strong>Geographic:</strong> Family-friendly suburban areas</li>
                      <li><strong>Activity:</strong> First walks, playground time, exploring</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Extra toe protection</li>
                      <li>Easy on/off design</li>
                      <li>Flexible for developing feet</li>
                      <li>Machine washable</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Toddlers taking their first outdoor adventures
                </p>
              </div>

              {/* Rocket Racer */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">2. Rocket Racer - The Speed Enthusiast</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $65</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Active kids 6-12, sports participants</li>
                      <li><strong>Psychographics:</strong> Competitive, energetic, aspiring athletes</li>
                      <li><strong>Geographic:</strong> Areas with youth sports leagues</li>
                      <li><strong>Activity:</strong> Running, sports, PE class</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Lightweight for speed</li>
                      <li>Fun space-themed design</li>
                      <li>Durable for active kids</li>
                      <li>Performance features in kid sizes</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young athletes wanting to go fast
                </p>
              </div>

              {/* Rainbow Dash */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">3. Rainbow Dash - The Color Lover</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $60</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Kids 4-10 who love bright colors</li>
                      <li><strong>Psychographics:</strong> Creative, expressive, joyful</li>
                      <li><strong>Geographic:</strong> Nationwide</li>
                      <li><strong>Activity:</strong> School, play, everyday wear</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Vibrant color options</li>
                      <li>Comfortable all-day wear</li>
                      <li>Easy to clean</li>
                      <li>Gender-neutral appeal</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Kids who express themselves through color
                </p>
              </div>

              {/* Dino Stomp */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">4. Dino Stomp - The Prehistoric Adventurer</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $65</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Dinosaur-obsessed kids 3-8</li>
                      <li><strong>Psychographics:</strong> Imaginative, adventurous, curious</li>
                      <li><strong>Geographic:</strong> Nationwide</li>
                      <li><strong>Activity:</strong> Outdoor play, hiking with family</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Dinosaur-themed details</li>
                      <li>Rugged construction</li>
                      <li>&quot;Stomp&quot; traction pattern</li>
                      <li>Adventure-ready features</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young explorers with big imaginations
                </p>
              </div>

              {/* Star Jumper */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">5. Star Jumper - The Court Champion</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $70</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Kids 8-14 playing basketball</li>
                      <li><strong>Psychographics:</strong> Athletic, team-oriented, aspirational</li>
                      <li><strong>Geographic:</strong> Areas with youth basketball programs</li>
                      <li><strong>Activity:</strong> Basketball, court sports</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Court-appropriate traction</li>
                      <li>Ankle support</li>
                      <li>Professional styling in youth sizes</li>
                      <li>Durable for indoor/outdoor play</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young basketball players developing their game
                </p>
              </div>

              {/* Adventure Kit */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">6. Adventure Kit - The All-Rounder</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $65</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Active families with kids 5-12</li>
                      <li><strong>Psychographics:</strong> Outdoor-oriented, versatile needs</li>
                      <li><strong>Geographic:</strong> Near parks and trails</li>
                      <li><strong>Activity:</strong> Hiking, camping, general outdoor play</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Versatile for multiple activities</li>
                      <li>Quick-dry materials</li>
                      <li>Protective features</li>
                      <li>Value for growing feet</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Families needing one shoe for all adventures
                </p>
              </div>

              {/* Turbo Tot */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">7. Turbo Tot - The Busy Toddler</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $50</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Parents of active toddlers 2-4</li>
                      <li><strong>Psychographics:</strong> Convenience-seeking, busy families</li>
                      <li><strong>Geographic:</strong> Urban and suburban families</li>
                      <li><strong>Activity:</strong> Daycare, playdates, errands</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Slip-on design</li>
                      <li>No-tie convenience</li>
                      <li>Secure fit</li>
                      <li>Affordable for fast-growing feet</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Busy parents needing quick, secure footwear
                </p>
              </div>

              {/* Galaxy Glow */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">8. Galaxy Glow - The Night Light</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $75</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Kids 4-10 who love special features</li>
                      <li><strong>Psychographics:</strong> Tech-loving, attention-seeking, fun-focused</li>
                      <li><strong>Geographic:</strong> Safe neighborhoods for evening play</li>
                      <li><strong>Activity:</strong> Evening activities, special occasions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>LED light-up features</li>
                      <li>USB rechargeable</li>
                      <li>Safety visibility</li>
                      <li>&quot;Wow factor&quot; for kids</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Kids who want shoes that make a statement
                </p>
              </div>

              {/* Mini Summit */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">9. Mini Summit - Like Parent, Like Child</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $80</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> Outdoorsy parents with kids 6-14</li>
                      <li><strong>Psychographics:</strong> Family bonding through activities</li>
                      <li><strong>Geographic:</strong> Mountain and trail regions</li>
                      <li><strong>Activity:</strong> Family hikes, junior trail running</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Scaled-down adult technology</li>
                      <li>Serious performance for serious kids</li>
                      <li>Matches parent models</li>
                      <li>Grows with child&apos;s abilities</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Young athletes following in parents&apos; footsteps
                </p>
              </div>

              {/* Playground Pro */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">10. Playground Pro - The School Superstar</h3>
                <p className="text-xl font-semibold text-gray-700 mb-4">Price: $60</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Target Customer:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li><strong>Demographics:</strong> School-age kids 5-12</li>
                      <li><strong>Psychographics:</strong> Active, social, playground leaders</li>
                      <li><strong>Geographic:</strong> Nationwide schools</li>
                      <li><strong>Activity:</strong> Recess, PE, after-school play</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Why This Shoe:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Durable for daily wear</li>
                      <li>Playground-tested traction</li>
                      <li>Comfortable for all-day school</li>
                      <li>Reinforced high-wear areas</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4 font-semibold text-gray-800">
                  Best For: Active kids who play hard every day
                </p>
              </div>
            </div>
          </section>

          {/* Quick Reference Matrix */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span> Quick Reference Matrix
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Segments */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Price Segments:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Budget ($50-$100):</strong> Kids&apos; shoes, entry-level adult styles</li>
                  <li><strong>Mid-Range ($101-$150):</strong> Core performance, daily wear</li>
                  <li><strong>Premium ($151-$200):</strong> Advanced technology, specialized use</li>
                  <li><strong>Elite ($201+):</strong> Professional-grade, cutting-edge features</li>
                </ul>
              </div>

              {/* Activity Match */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Activity Match:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Running:</strong> Apex Runner, Luna Rise, Summit Pro</li>
                  <li><strong>Trail:</strong> Terra Guide, Flora Trail, Peak Pursuit</li>
                  <li><strong>Gym:</strong> Velocity Core, Power Stride, Sky Dancer</li>
                  <li><strong>Lifestyle:</strong> Urban Forge, Ridge Walker, Metro Glide</li>
                  <li><strong>All-Weather:</strong> Storm Shield, Night Hawk, Aurora Run</li>
                </ul>
              </div>

              {/* Customer Priorities */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Customer Priorities:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Performance First:</strong> Summit Pro, Apex Runner, Peak Pursuit</li>
                  <li><strong>Style First:</strong> Ridge Walker, Stellar Step, Galaxy Glow</li>
                  <li><strong>Comfort First:</strong> Elevate Max, Cloud Nine, Little Explorer</li>
                  <li><strong>Value First:</strong> Urban Forge, Horizon Lite, Playground Pro</li>
                  <li><strong>Sustainability First:</strong> Urban Forge, Flora Trail, Eco Line selections</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Back to Home Button */}
          <div className="text-center mt-12">
            <Button asChild className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}