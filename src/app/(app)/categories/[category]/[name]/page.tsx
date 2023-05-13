import { StarIcon } from "@/assets/icons";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { informationFieldSchema } from "./Types";
import NewImageUrl from "@/app/(app)/categories/[category]/[name]/NewImageUrl";
import AuthGuardedToggle from "@/components/AuthGuardedToggle";
import { addRating, deleteRating } from "@/server/actions";
import { auth, clerkClient } from "@clerk/nextjs";
import { Rating } from "@prisma/client";
import UserGuard from "@/components/UserGuard";

export const revalidate = 3600; // revalidate every hour

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  params: {
    category: string;
    name: string;
  };
}

type coffeeInfo = {
  bitterness: number;
  acidity: number;
  body: number;
  roast: number;
};
async function getItemData(name: string, category: string) {
  console.log("Name:", name);
  console.log("Category", category);
  return prisma.item.findFirst({
    where: {
      name: name,
      category: {
        slug: category,
      },
    },
    select: {
      images: {
        take: 1,
      },
      informationField: true,
      name: true,
      category: true,
      description: true,
      id: true,
      ratings: true,
    },
  });
}

export default async function ItemPage({ params: { category, name } }: Props) {
  const { userId } = auth();
  console.log(name);
  const decodedName = decodeURI(name);
  console.log(decodedName);
  const item = await getItemData(decodedName.toString(), category);

  const addUserData = async (ratings: Rating[]) => {
    const userId = ratings.map((rating) => rating.userId);
    const users = await clerkClient.users.getUserList({ userId: userId });
    return ratings.map((rating) => {
      const user = users.find((user) => user.id === rating.userId);
      return {
        ...rating,
        userId: user?.firstName ?? "",
        userSecretId: rating.userId,
      };
    });
  };

  const stylizedRatings = await addUserData(item?.ratings ?? []);

  const calculateAverage = (ratings: { rating: number }[]) => {
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return total / ratings.length;
  };

  const totalReviews = {
    average: calculateAverage(item?.ratings ?? []),
    totalCount: item?.ratings.length,
  };

  if (!item) {
    notFound();
  }

  const validatedInformationField = informationFieldSchema.parse(
    item.informationField
  );
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
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
                  {totalReviews.totalCount} review
                  <span
                    className={`${
                      totalReviews.totalCount === 1 ? "hidden" : ""
                    }`}
                  >
                    s
                  </span>
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
            {/* TODO: Add image carousel */}
            {item.images.map((image) => (
              <>
                <AuthGuardedToggle>
                  {/* @ts-expect-error */}
                  <NewImageUrl imageId={image.id} />
                </AuthGuardedToggle>
                <img
                  key={image.id}
                  src={image.href}
                  alt={image.alt}
                  className="h-full w-full object-cover object-center"
                />
              </>
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
              {Object.keys(validatedInformationField.flavourProfile).map(
                (flavour) => (
                  <div className="flex gap-2" key={flavour}>
                    <h3 className="w-32 text-sm uppercase">{flavour}</h3>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <div
                          key={rating}
                          className={classNames(
                            validatedInformationField.flavourProfile[
                              flavour as keyof coffeeInfo
                            ] > rating
                              ? "bg-zinc-200"
                              : "bg-zinc-600",
                            "h-1 w-12 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                )
              )}
            </section>
          )}
        </div>
      </div>
      {/* Reviews */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-medium">Recent reviews</h2>
        {!item.ratings.some((rating) => rating.userId === userId) && (
          <>
            <h3 className="py-4 text-sm italic">
              You haven&apos;t reviewed this yet
            </h3>
            <form
              action={addRating}
              method="POST"
              className="grid w-full max-w-xl content-center gap-4 bg-transparent"
            >
              <div className="col-span-1 flex flex-col">
                <label htmlFor="ratingScore">Rating</label>
                <select
                  name="ratingScore"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="invisible">Hidden</label>
                <input
                  type="submit"
                  value="Submit"
                  className="col-span-1 block w-full cursor-pointer rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="col-span-2 flex flex-col">
                <label htmlFor="comment">Comment</label>
                <textarea
                  name="comment"
                  rows={4}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              <br />
              <input type="hidden" name="itemId" value={item.id} />
            </form>
          </>
        )}
        {item.ratings.length > 0 ? (
          <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
            {stylizedRatings.map((rating) => (
              <div
                key={rating.id}
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((ratingScore) => (
                        <StarIcon
                          key={ratingScore}
                          className={classNames(
                            rating.rating > ratingScore
                              ? "text-yellow-400"
                              : "",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm">
                      {rating.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <p className="text-base">{rating.comment}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <UserGuard id={rating.userSecretId}>
                    <form action={deleteRating}>
                      <button type="submit">Delete</button>
                      <input type="hidden" name="ratingId" value={rating.id} />
                      <input
                        type="hidden"
                        name="categoryName"
                        value={category}
                      />
                      <input type="hidden" name="itemName" value={name} />
                    </form>
                  </UserGuard>
                  <p className="font-medium">{rating.userId}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div>No reviews yet</div>
          </>
        )}
      </div>
    </div>
  );
}
