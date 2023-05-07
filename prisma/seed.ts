import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.category.upsert({
    where: { slug: "nespresso-capsules" },
    update: {},
    create: {
      name: "Nespresso Capsules",
      slug: "nespresso-capsules",
      description:
        "Nespresso capsules are small, single-serving pods of ground coffee that are designed for use with Nespresso machines. With a variety of flavor options and color-coded intensity levels, Nespresso capsules offer a convenient and customizable coffee experience. Simply insert a capsule, press a button, and enjoy a perfectly brewed cup of coffee or espresso every time.",
      totalRatings: 0,
      image: {
        create: {
          href: "https://www.nespresso.com/ecom/medias/sys_master/public/13594937819166/M-1241-Desktop-PDP-6272x2432.jpg?impolicy=productPdpSafeZone&imwidth=1238",
          alt: "Nespresso Capsules",
        },
      },
    },
  });
  // Double Espressos
  await prisma.item.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Double Espresso Scuro",
      description:
        "Double Espresso Scuro is a highly roasted blend made from Central American Robusta and Arabicas. Its very dark smoky character is enriched by notes reminiscent of cocoa and vanilla.",
      href: "https://www.nespresso.com/us/en/order/capsules/vertuo/double-espresso-scuro-vertuo-coffee-pods",
      informationField: {
        capsuleType: "Vertuo",
        tagLine: "Dark & Bold",
        cupSize: "DOUBLE ESPRESSO (2.7 OZ)",
        intensity: 11,
        notes: "Roasted & Chocolatey",
        flavourProfile: {
          bitterness: 3,
          acidity: 1,
          body: 3,
          roast: 3,
        },
      },
      categoryId: "nespresso-capsules",
      images: {
        create: {
          href: "https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-sleeves/vl/double-espresso-scuro_L.png",
          alt: "Double Espresso Scuro",
        },
      },
    },
  });
  await prisma.item.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Double Espresso Chiaro",
      description:
        "Double Espresso Chiaro is a lightly roasted blend made from Central American Arabicas. Its light body is enriched with sweet cereal and subtle floral notes.",
      href: "https://www.nespresso.com/us/en/order/capsules/vertuo/double-espresso-chiaro-vertuo-coffee-pods",
      informationField: {
        capsuleType: "Vertuo",
        tagLine: "Dense & Wild",
        cupSize: "DOUBLE ESPRESSO (2.7 OZ)",
        intensity: 6,
        notes: "Woody & Earthy",
        flavourProfile: {
          bitterness: 3,
          acidity: 1,
          body: 3,
          roast: 2,
        },
      },
      categoryId: "nespresso-capsules",
      images: {
        create: {
          href: "https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-sleeves/vl/double-espresso-chiaro_L.png",
          alt: "Double Espresso Chiaro",
        },
      },
    },
  });
  await prisma.item.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Costa Rica",
      description:
        "The one-of-a-kind process of fermentation in hot-spring waters brings about a remarkably balanced and clean taste in the cup. Master Origins Costa Rica is full-bodied but mellow. A malty sweet cereal note runs through it with crystal clarity.",
      href: "https://www.nespresso.com/no/no/order/capsules/vertuo/vertuo-costa-rica-kaffe",
      informationField: {
        capsuleType: "Vertuo",
        cupSize: "DOUBLE ESPRESSO (2.7 OZ)",
        tagLine: "Malty & Sweet",
        notes: "Nutty & Balanced",
        intensity: 7,
        flavourProfile: {
          bitterness: 3,
          acidity: 1,
          roast: 4,
          body: 3,
        },
      },
      categoryId: "nespresso-capsules",
      images: {
        create: {
          href: "https://www.nespresso.com/shared_res/agility/n-components/pdp/sku-main-info/coffee-sleeves/vl/costa-rica_L.png",
          alt: "Costa Rica",
        },
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
