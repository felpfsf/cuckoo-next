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
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Alice Williams",
    email: "alice.williams@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Mike Brown",
    email: "mike.brown@example.com",
    password,
    salt,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

function createUsers() {
  Promise.all(users.map((n) => prisma.user.create({ data: n })))
    .then(() => console.info("Created"))
    .catch((e) => console.error("Error creating", e));
}

createUsers();
