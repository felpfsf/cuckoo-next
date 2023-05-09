import Image from "next/image";
import AvatarMockup from "../../assets/avatar_mockup_2.png";

interface FollowerCardProps {
  image: string;
  name: string;
  followingCount: number;
  followersCount: number;
}

export const FollowUserCard = ({
  followersCount,
  followingCount,
  image,
  name,
}: FollowerCardProps) => {
  return (
    <div className='flex gap-3 p-4'>
      <figure>
        <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-fuchsia-900'>
          <Image
            src={image ? image : AvatarMockup}
            alt='Avatar do usuário'
            width={64}
            height={64}
            className='h-full w-full object-cover'
          />
        </div>
      </figure>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold md:text-base'>{name}</p>
        <div className='flex gap-8'>
          <span>
            <strong>{followingCount}</strong> Seguindo
          </span>
          <span>
            <strong>{followersCount}</strong> Seguidores
          </span>
        </div>
      </div>
    </div>
  );
};
