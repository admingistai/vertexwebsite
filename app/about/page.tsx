"use client"

import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const founders = [
    {
      name: "Marcus Chen",
      title: "CEO & Co-founder",
      description: "Started designing shoes in his garage after getting stress fractures from cheap running gear during his college track days. Spent 8 years at Nike before realizing the industry needed more honest, athlete-focused brands.",
      image: "/images/team/marcus-chen.jpg"
    },
    {
      name: "Elena Rodriguez",
      title: "Sustainability Lead & Co-founder", 
      description: "Environmental science PhD who got tired of seeing gear companies greenwash their way to profits. Climbs 5.11 and has summited peaks on four continents while researching sustainable materials.",
      image: "/images/team/elena-rodriguez.jpg"
    },
    {
      name: "James Thompson",
      title: "Product Development & Co-founder",
      description: "Broke his first pair of trail shoes on mile 30 of his first ultra. Now stress-tests every design by running 100+ miles in prototypes before they go into production.",
      image: "/images/team/trail-thompson.jpg"
    }
  ]

  const stats = [
    { number: "500,000+", label: "Happy feet on trails worldwide" },
    { number: "2.5 million", label: "Plastic bottles recycled into shoes" },
    { number: "47", label: "Pro athletes on Team VERTEX" },
    { number: "100%", label: "Carbon neutral shipping since 2022" },
    { number: "15", label: "Countries with VERTEX retail presence" },
    { number: "$1M+", label: "Donated to trail conservation efforts" }
  ]

  const technologies = [
    {
      name: "Storm Shield",
      description: "Waterproof membrane that actually breathes during intense activity"
    },
    {
      name: "CloudCore",
      description: "Dual-density foam that returns 85% of impact energy"
    },
    {
      name: "GripTech",
      description: "Rubber compound tested on wet granite and loose scree"
    },
    {
      name: "EcoWeave",
      description: "Recycled ocean plastic that's stronger than virgin polyester"
    }
  ]

  const values = [
    {
      title: "Test Everything",
      description: "Our team runs 200+ miles in every prototype before production. If it doesn't work for a 50-mile trail race, it doesn't make it to market."
    },
    {
      title: "Less Waste, More Performance",
      description: "30% of our materials come from recycled sources. Not because it's trendy, but because it's often more durable than virgin materials."
    },
    {
      title: "Athletes First",
      description: "We sponsor runners who need gear, not just those with big social followings. Our athlete feedback drives every design decision."
    },
    {
      title: "Honest Marketing",
      description: "No magic cushioning or revolutionary breakthroughs. Just solid engineering, quality materials, and honest pricing."
    }
  ]

  return (
    <>
      <Header currentSection="about" />
      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/stories/mount-rainier.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">We Build Gear That Works</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">Started by three athletes who got tired of gear that didn&apos;t live up to the hype</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-3">
                <Link href="/products">Shop Our Gear</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                <Link href="#story">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="">
          {/* Story Section */}
          <section id="story" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
                    <Image 
                      src="/images/stories/mount-rainier.jpg" 
                      alt="Mount Rainier, 2018" 
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                        Mount Rainier, 2018
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="max-w-lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                      Started on a Mountain
                    </h2>
                    <div className="space-y-6">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        In 2018, Marcus was 30 miles into the Wonderland Trail when his shoes fell apart. Elena&apos;s &quot;waterproof&quot; jacket was soaked through. James was nursing blisters from his brand-new trail runners.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        We were three outdoor obsessives with day jobs—product design, environmental science, and materials engineering. That night in our soggy tent, we made a pact: build gear that actually works.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed font-medium">
                        No marketing fluff. Just honest testing by people who actually use their gear.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Mission is Simple
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Whether you&apos;re running your first 5K or your tenth ultra, you deserve gear that won&apos;t let you down. We test everything ourselves because we use it ourselves.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  How We Work
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Four principles that guide everything we do
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="group">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Our Impact Since 2018
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Numbers that matter to us
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                      <div className="text-4xl md:text-5xl font-bold mb-4 text-white">{stat.number}</div>
                      <div className="text-gray-300 text-lg">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What&apos;s Inside
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Four technologies we actually developed (not licensed)
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {technologies.map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">{tech.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                          <p className="text-gray-600 leading-relaxed text-lg">{tech.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Meet the Team
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Three people who take gear testing seriously
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {founders.map((founder, index) => (
                  <div key={index} className="group">
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-3xl">{founder.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                        <p className="text-gray-600 font-medium mb-4">{founder.title}</p>
                        <p className="text-gray-600 leading-relaxed">{founder.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Test Our Gear?
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                We&apos;re always looking for feedback from people who actually use their gear. Whether you&apos;re testing prototypes or just want to share what works (and what doesn&apos;t), we&apos;d love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  asChild
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
                >
                  <Link href="/products">Shop Our Gear</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg rounded-xl"
                >
                  <Link href="/new">See What&apos;s New</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
              <p className="text-lg text-gray-600 mb-6">
                Questions about fit, returns, or just want to chat about trail running?
              </p>
              <a 
                href="mailto:hello@vertex-athletic.com" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors inline-block mb-8"
              >
                hello@vertex-athletic.com
              </a>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <span>B-Corp Certified</span>
                <span>•</span>
                <span>1% for the Planet Member</span>
                <span>•</span>
                <span>Portland, OR</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}