import { CATEGORY_LIST } from "../data/artists";

/**
 * Fetches 20 users from randomuser.me and maps them
 * to our artist data shape.
 */
export async function fetchArtists() {
  const response = await fetch("https://randomuser.me/api/?results=20&seed=artista");
  if (!response.ok) throw new Error("Failed to fetch artists");

  const { results } = await response.json();

  return results.map((user, index) => ({
    id: index + 1,
    name: `${user.name.first} ${user.name.last}`,
    profile_image: user.picture.large,
    art_category: CATEGORY_LIST[index % CATEGORY_LIST.length],
    location: `${user.location.city}, ${user.location.country}`,
    followers: Math.floor(Math.random() * 50000) + 1000,
    bio: `${user.name.first} is a passionate ${CATEGORY_LIST[index % CATEGORY_LIST.length].toLowerCase()} based in ${user.location.city}. With years of experience, their work has been showcased in galleries and exhibitions worldwide. They draw inspiration from everyday life and push creative boundaries with every piece.`,
    social_links: {
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      website: "https://example.com",
    },
    portfolio: [
      `https://picsum.photos/seed/${user.login.uuid}1/600/400`,
      `https://picsum.photos/seed/${user.login.uuid}2/600/400`,
      `https://picsum.photos/seed/${user.login.uuid}3/600/400`,
      `https://picsum.photos/seed/${user.login.uuid}4/600/400`,
      `https://picsum.photos/seed/${user.login.uuid}5/600/400`,
      `https://picsum.photos/seed/${user.login.uuid}6/600/400`,
    ],
    banner: `https://picsum.photos/seed/${user.login.uuid}banner/1200/400`,
    isPremium: false,
  }));
}