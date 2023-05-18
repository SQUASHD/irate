import {
  MagnifyingGlassIcon,
  StarIcon,
  UserGroupIcon,
  FingerPrintIcon,
  CircleStackIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Rate and Review.",
    description:
      "Easily rate and review your favourite products. You can also edit and delete your ratings and reviews at any time.",
    icon: StarIcon,
  },
  {
    name: "Persistent Data.",
    description:
      "Your ratings and reviews are securely stored and readily accessible whenever you need them.",
    icon: CircleStackIcon,
  },
  {
    name: "Filter & Search.",
    description: "Filter through enormous amounts of data with ease.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Authentication.",
    description:
      "Only authorized users have access to certain data and functionalities.",
    icon: FingerPrintIcon,
  },
  {
    name: "User & Team Pages.",
    description:
      "Personal spaces so you can view and compare your ratings and reviews with others. You can also create teams and invite others to join.",
    icon: UserGroupIcon,
  },
  {
    name: "Only love.",
    description:
      "Any form of hate speech, harassment, or bullying is strictly prohibited.",
    icon: HeartIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-amber-400">
            Your One-Stop Solution for Ratings
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            No more spreadsheets. No more headaches.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Welcome to an intuitive and dependable rating application, carefully
            crafted to meet your diverse needs, providing superior functionality
            and efficiency.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-amber-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
