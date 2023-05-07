import { StarIcon } from "@/assets/icons";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

const totalReviews = { average: 4, totalCount: 1624 };
const reviews = [
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
      <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
  // More reviews...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  params: {
    category: string;
    id: string;
  };
}

type coffeeInfo = {
  bitterness: number;
  acidity: number;
  body: number;
  roast: number;
};

export default async function ItemPage({ params: { category, id } }: Props) {
  console.log(category, id);
  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      images: {
        take: 1,
      },
    },
  });

  if (!item) {
    notFound();
  }
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {item.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <h2 className="sr-only">Reviews</h2>
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`${
                          totalReviews.average > rating ? "text-yellow-400" : ""
                        } "h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">
                    {totalReviews.average} out of 5 stars
                  </p>
                </div>
                <p className="ml-2 text-sm">
                  {totalReviews.totalCount} reviews
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base">{item.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            {item.images.map((image) => (
              <img
                key={image.id}
                src={image.href}
                alt={image.alt}
                className="h-full w-full object-cover object-center"
              />
            ))}
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          {category === "nespresso-capsules" && (
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product Information
              </h2>
              {Object.keys(
                item.informationField?.flavourProfile as coffeeInfo
              ).map((flavour) => (
                <div className="flex gap-2" key={flavour}>
                  <h3 className="w-32 text-sm uppercase">{flavour}</h3>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <div
                        key={rating}
                        className={classNames(
                          item.informationField.flavourProfile[flavour] > rating
                            ? "bg-zinc-200"
                            : "bg-zinc-600",
                          "h-1 w-12 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <label
          htmlFor="comment"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Add your comment
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="comment"
            id="comment"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
      </div>
      {/* Reviews */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-medium">Recent reviews</h2>
        <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
            >
              <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                <div className="flex items-center xl:col-span-1">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating ? "text-yellow-400" : "",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm">
                    {review.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                </div>

                <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                  <h3 className="text-sm font-medium">{review.title}</h3>

                  <div
                    className="mt-3 space-y-6 text-sm"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                <p className="font-medium">{review.author}</p>
                <time
                  dateTime={review.datetime}
                  className="ml-4 border-l border-gray-200 pl-4 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                >
                  {review.date}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
