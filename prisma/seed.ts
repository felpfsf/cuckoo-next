import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/passwordCrypto";

const { hash: password, salt } = hashPassword("password123");
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    posts: [
      {
        content: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. ",
      },
      {
        content: "Do something nice for someone I care about",
      },
    ],
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    posts: [
      {
        content: "Trying out a new recipe tonight.",
      },
      {
        content: "I love listening to music while I work.",
      },
    ],
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    posts: [
      {
        content: "Strive not to be a success, but rather to be of value.",
      },
      {
        content: "I attribute my success to this: I never gave or took any excuse.",
      },
    ],
  },
  {
    name: "Alice Williams",
    email: "alice.williams@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    posts: [
      {
        content: "Can't wait to see my friends this weekend.",
      },
      {
        content: "The most difficult thing is the decision to act, the rest is merely tenacity.",
      },
    ],
  },
  {
    name: "Mike Brown",
    email: "mike.brown@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    posts: [
      {
        content: "Feeling grateful for all the good things in my life.",
      },
      {
        content: "Enjoying a relaxing Sunday.",
      },
    ],
  },
];

async function createPost(userId: string, post: { content: string }) {
  await prisma.post.create({
    data: {
      content: post.content,
      authorId: userId,
    },
  });
}

async function createUser(user: {
  name: string;
  email: string;
  password: string;
  salt: string;
  image: string;
  posts: { content: string }[];
}) {
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      salt: user.salt,
      image: user.image,
    },
  });

  for (const post of user.posts) {
    await createPost(createdUser.id, post);
  }
}

async function createUsers() {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.info("Created");
  } catch (e) {
    console.error("Error creating", e);
  }
}

createUsers();

// function createUsers() {
//   Promise.all(users.map((n) => prisma.user.create({ data: n })))
//     .then(() => console.info("Created"))
//     .catch((e) => console.error("Error creating", e));
// }

// createUsers();
