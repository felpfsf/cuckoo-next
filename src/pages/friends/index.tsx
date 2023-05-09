import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import * as Tabs from "@radix-ui/react-tabs";
import MainLayout from "@/components/MainLayout";
import { FollowUserCard } from "@/components/FollowUserCard";
import { BsArrowLeftShort } from "react-icons/bs";

interface UserProps {
  id: string;
  name: string;
  image: string;
  followers: Follows[];
  following: Follows[];
}

interface Follows extends UserProps {}

interface UserFollowsProps {
  user: UserProps;
  followers: Follows[];
  followings: Follows[];
}

export default function UserFollows({
  followers,
  followings,
  user,
}: UserFollowsProps) {
  return (
    <MainLayout pageTitle={`Seguidores de ${user.name} | Cuckoo`}>
      <div className='p-4'>
        <div className='mb-8'>
          <Link href={"/"} className='group flex items-center gap-4'>
            <BsArrowLeftShort size={32} />
            <span className='border-b-fuchsia-200 text-xl font-semibold group-hover:border-b'>
              Retornar
            </span>
          </Link>
        </div>
        <Tabs.Root
          defaultValue='tab-followers'
          className='flex justify-center sm:justify-start'
        >
          <Tabs.List aria-label='Veja seus seguidores e quem está seguindo'>
            <div className='mb-8 flex gap-8'>
              <Tabs.Trigger
                value='tab-followers'
                className='border-b border-b-transparent font-semibold outline-none hover:border-fuchsia-500 data-[state=active]:border-b-fuchsia-500 data-[state=active]:text-fuchsia-300 data-[state=active]:focus:relative'
              >
                Seus Seguidores
              </Tabs.Trigger>
              <Tabs.Trigger
                value='tab-following'
                className='border-b border-b-transparent font-semibold outline-none hover:border-fuchsia-500 data-[state=active]:border-b-fuchsia-500 data-[state=active]:text-fuchsia-300 data-[state=active]:focus:relative'
              >
                Seguindo
              </Tabs.Trigger>
            </div>
            <Tabs.Content value='tab-followers'>
              {followers.length === 0 ? (
                <p>Você ainda não tem seguidores</p>
              ) : (
                <ul className='flex flex-col gap-4'>
                  {followers.map((follower) => (
                    <li key={follower.id}>
                      <Link href={`/users/${follower.id}`}>
                        <FollowUserCard
                          followingCount={follower.following.length}
                          followersCount={follower.followers.length}
                          {...follower}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Tabs.Content>
            <Tabs.Content value='tab-following'>
              {followings.length === 0 ? (
                <p>Você ainda não tem seguidores</p>
              ) : (
                <ul className='flex flex-col gap-4'>
                  {followings.map((following) => (
                    <li key={following.id}>
                      <Link href={`/users/${following.id}`}>
                        <FollowUserCard
                          followingCount={following.following.length}
                          followersCount={following.followers.length}
                          {...following}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Tabs.Content>
          </Tabs.List>
        </Tabs.Root>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userSessionId = session?.user.id;
  console.log(session);
  const user =
    session &&
    (await prisma.user.findUnique({
      where: { id: userSessionId },
      select: {
        name: true,
        image: true,
        followers: true,
        following: true,
      },
    }));
  const followersId = user?.followers.map((item) => item.followerId);
  const followoingsId = user?.following.map((item) => item.followingId);

  const followers = await prisma.user.findMany({
    where: { id: { in: followersId } },
    select: {
      id: true,
      image: true,
      name: true,
      followers: true,
      following: true,
    },
  });
  const followings = await prisma.user.findMany({
    where: { id: { in: followoingsId } },
    select: {
      id: true,
      image: true,
      name: true,
      followers: true,
      following: true,
    },
  });

  console.log(followers);
  console.log(followings);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      followers: JSON.parse(JSON.stringify(followers)),
      followings: JSON.parse(JSON.stringify(followings)),
    },
  };
};
