import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.category.create({
    data: {
      name: "Nespresso Capsules",
      slug: "nespresso-capsules",
      description:
        "Nespresso capsules are small, single-serving pods of ground coffee that are designed for use with Nespresso machines. With a variety of flavor options and color-coded intensity levels, Nespresso capsules offer a convenient and customizable coffee experience. Simply insert a capsule, press a button, and enjoy a perfectly brewed cup of coffee or espresso every time.",
      image:
        "https://www.nespresso.com/ecom/medias/sys_master/public/13594937819166/M-1241-Desktop-PDP-6272x2432.jpg?impolicy=productPdpSafeZone&imwidth=1238",
      totalRatings: 0,
      items: {
        create: [
          {
            name: "Double Espresso Scuro",
            description:
              "Double Espresso Scuro is a highly roasted blend made from Central American Robusta and Arabicas. Its very dark smoky character is enriched by notes reminiscent of cocoa and vanilla.",
            href: "https://www.nespresso.com/us/en/order/capsules/vertuo/double-espresso-scuro-vertuo-coffee-pods",
            image: "https://i.imgur.com/2xZ7x2H.jpg",
            informationField: {
              capsuleType: "Vertuo",
              tagLine: "Dark & Bold",
              cupSize: "DOUBLE ESPRESSO (2.7 OZ)",
              intensity: 11,
              flavourProfile: {
                bitterness: 3,
                acidity: 1,
                body: 3,
                roast: 3,
              },
            },
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
