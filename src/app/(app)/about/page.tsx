import Link from "next/link";

const timeline = [
  {
    name: "Conceptualized project",
    description:
      "Dad mentioned that it would be cool to have a place to rate Nespresso capsules.",
    date: "Apr 2023",
    dateTime: "2021-04",
  },
  {
    name: "Started project",
    description:
      "After finishing off a project for a client I got to work on the app.",
    date: "May 2023",
    dateTime: "2021-05",
  },
  {
    name: "Secured 7kr in funding",
    description: "I really emptied my wallet to secure the domain name.",
    date: "May 2023",
    dateTime: "2023-04",
  },
  {
    name: "Released beta",
    description:
      "After a good weekend's effort I had an app that was ready for use.",
    date: "May 2023",
    dateTime: "2023-05",
  },
];

export default function AboutPage() {
  return (
    <>
      <main className="isolate py-8">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden pt-4">
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl lg:col-span-2 xl:col-auto">
                A small passion project grown out of my dad&apos;s love for
                coffee and rating things.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-zinc-400">
                  Small projects like this are a great way to learn new
                  technologies and have fun while doing it. I&apos;ve been
                  wanting to really have a go at SSR and using React Server
                  Components and this was the perfect opportunity. It&apos;s
                  also nice to have an actual end user in mind who isn&apos;t
                  afraid to give feedback and make requests. You can check out
                  the source code on{" "}
                  <Link href="https://github.com/squashd/irate">
                    <span className="text-amber-400">GitHub</span>
                  </Link>
                  .
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                alt=""
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 sm:h-32" />
        </div>

        {/* Timeline section */}
        <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.name}>
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm font-semibold leading-6 text-amber-400"
                >
                  <svg
                    viewBox="0 0 4 4"
                    className="mr-4 h-1 w-1 flex-none"
                    aria-hidden="true"
                  >
                    <circle cx={2} cy={2} r={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-zinc-100/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                    aria-hidden="true"
                  />
                </time>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-zinc-100">
                  {item.name}
                </p>
                <p className="mt-1 text-base leading-7 text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Content section */}
        <div className="mt-32 overflow-hidden sm:mt-40">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                  Who am I?
                </h2>
                <p className="mt-6 text-xl leading-8 text-zinc-400">
                  I&apos;m just a junior developer who loves to learn new things
                  and solve problems. I got started with web development in
                  August 2022, and have been hooked ever since.
                </p>
                <p className="mt-6 text-base leading-7 text-zinc-400">
                  I&apos;m currently looking for work, so if you&apos;re
                  interested in hiring me, please get in touch. I also do some
                  freelancing on the side, so if you&apos;re interested in that,
                  please get in touch as well. You can see more of my work on{" "}
                  <Link href={"https://hjartland.dev"}>
                    <span className="text-amber-400">my portfolio site</span>
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                      alt=""
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
