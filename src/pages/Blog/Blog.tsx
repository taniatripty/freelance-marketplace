const blogs = [
  {
    id: 1,
    title: "How Freelancers Can Win Better Clients in 2026",
    category: "Freelancing",
    date: "July 2, 2026",
    readTime: "6 min read",
    author: "FreelanceHub Team",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Learn practical ways to improve your profile, communicate better, and build trust with clients on FreelanceHub.",
  },
  {
    id: 2,
    title: "Top Skills in Demand for Remote Work This Year",
    category: "Career Tips",
    date: "June 28, 2026",
    readTime: "5 min read",
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    description:
      "A quick look at the skills clients are searching for most, from web development to digital marketing and UI design.",
  },
  {
    id: 3,
    title: "How to Write a Project Proposal That Gets Approved",
    category: "Guides",
    date: "June 21, 2026",
    readTime: "4 min read",
    author: "FreelanceHub Team",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    description:
      "Use this simple proposal structure to explain value clearly, build confidence, and increase your chances of winning work.",
  },
  {
    id: 4,
    title: "Best Ways to Manage Multiple Freelance Projects",
    category: "Productivity",
    date: "June 16, 2026",
    readTime: "7 min read",
    author: "Editorial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description:
      "Stay organized with time blocks, task tracking, and simple workflow habits that help you deliver work on time.",
  },
];

const categories = ["All", "Freelancing", "Career Tips", "Guides", "Productivity"];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <section className="border-b border-base-300 bg-base-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm text-primary">
            FreelanceHub Blog
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ideas, tips, and updates for freelancers and clients.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-base-content/70 sm:text-lg">
            Read practical guides, platform updates, and expert advice to help
            you grow faster on FreelanceHub.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                className="rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm text-base-content/80 transition hover:border-primary hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm lg:col-span-2">
            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className="h-72 w-full object-cover sm:h-80"
            />
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-base-content/60">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                  Featured
                </span>
                <span>{blogs[0].category}</span>
                <span>•</span>
                <span>{blogs[0].date}</span>
                <span>•</span>
                <span>{blogs[0].readTime}</span>
              </div>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                {blogs[0].title}
              </h2>

              <p className="mt-4 text-base-content/70">{blogs[0].description}</p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-sm text-base-content/60">
                  By <span className="text-base-content">{blogs[0].author}</span>
                </div>
                <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition hover:opacity-90">
                  Read Article
                </button>
              </div>
            </div>
          </article>

          <aside className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <h3 className="text-lg font-semibold">Popular topics</h3>
            <div className="mt-4 space-y-3">
              {[
                "Freelancing Growth",
                "Client Management",
                "Profile Building",
                "Project Delivery",
                "Reviews & Trust",
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex items-center justify-between rounded-xl bg-base-200 px-4 py-3 text-sm text-base-content/80"
                >
                  <span>{topic}</span>
                  <span className="text-primary">→</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-primary/10 p-4">
              <p className="text-sm text-primary">Want more updates?</p>
              <p className="mt-1 text-sm text-base-content/70">
                Follow the blog for guides, platform news, and freelance tips.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest articles</h2>
          <span className="text-sm text-base-content/60">{blogs.length} posts</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-base-content/60">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold leading-snug">
                  {blog.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-base-content/70">
                  {blog.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-base-content/60">{blog.author}</span>
                  <button className="text-sm font-medium text-primary hover:opacity-80">
                    Read more
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;