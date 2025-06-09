export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "DarkMail has completely transformed how I handle sensitive communications. The interface is beautiful and the security features give me peace of mind. The AI features save me hours every week!",
      author: "Sarah J.",
      role: "UX Designer",
      avatar: "S",
    },
    {
      quote:
        "As a journalist, I need to know my communications are secure. DarkMail provides that security without sacrificing usability. The natural language search is a game-changer for finding sources and old interviews.",
      author: "Michael T.",
      role: "Investigative Journalist",
      avatar: "M",
    },
    {
      quote:
        "Our entire team switched to DarkMail for our internal communications. The admin controls and custom domain support are exactly what we needed. The meeting coordinator alone has saved us countless hours of back-and-forth.",
      author: "Alex R.",
      role: "CTO, TechStart Inc.",
      avatar: "A",
    },
  ]

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied users who have transformed their email experience
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center text-primary font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
