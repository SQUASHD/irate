import { FavButton } from "./FavouriteButton";

type ImageCardProps = {
  itemId: number;
  userId: string;
  favourited: boolean;
  imageId: number;
  href: string;
  alt: string;
};

export const ImageCard = (props: ImageCardProps) => {
  const { itemId, userId, favourited, imageId, href, alt } = props;

  return (
    <div className="relative flex max-h-48 flex-col items-center">
      <FavButton itemId={itemId} userId={userId} favourited={favourited} />
      <img
        key={imageId}
        src={href}
        alt={alt}
        className="h-48 object-cover object-center"
      />
    </div>
  );
};
