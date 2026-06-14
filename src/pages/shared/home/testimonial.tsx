const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    review:
      "We hired a React developer through the platform and completed our project ahead of schedule. The experience was smooth and professional.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Business Owner",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    review:
      "Finding skilled freelancers has never been easier. The quality of work exceeded our expectations.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    review:
      "Excellent communication and top-notch talent. We've hired multiple freelancers and achieved great results.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Thousands of businesses trust our platform to connect with talented
            freelancers around the world.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="mb-4 flex text-yellow-500">
                ⭐⭐⭐⭐⭐
              </div>

              {/* Review */}
              <p className="mb-6 text-slate-600">
                "{testimonial.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">10K+</h3>
            <p className="text-slate-500">Freelancers</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">25K+</h3>
            <p className="text-slate-500">Projects</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">98%</h3>
            <p className="text-slate-500">Success Rate</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">50+</h3>
            <p className="text-slate-500">Countries</p>
          </div>
        </div>
      </div>
    </section>
  );
}
