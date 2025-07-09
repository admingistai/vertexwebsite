export default function Footer() {
  const footerSections = [
    {
      title: "Resources",
      links: ["Gift Cards", "Find a Store", "Membership", "VERTEX Stories", "Site Feedback"],
    },
    {
      title: "Help",
      links: ["Get Help", "Order Status", "Shipping and Delivery", "Returns", "Order Cancellation"],
    },
    {
      title: "Company",
      links: ["About VERTEX", "News", "Careers", "Investors", "Sustainability"],
    },
    {
      title: "Promotions & Discounts",
      links: ["Student", "Military", "Teacher", "First Responders & Medical Professionals", "Birthday"],
    },
  ]


  return (
    <footer className="bg-foreground text-background">

      {/* Main Footer */}
      <div className="px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-background/60 hover:text-background transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <select className="bg-transparent border border-gray-600 rounded px-3 py-2 text-sm">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>

          <div className="text-sm text-background/60">
            <p>&copy; 2024 VERTEX ATHLETIC. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
