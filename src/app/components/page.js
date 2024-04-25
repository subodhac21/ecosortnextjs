import AppData from "./AppData";

export default async function Home() {
  // Fetch data from an API
  const response = await fetch('http://localhost:8000/users');
  const posts = await response.json();
  console.log(posts);
  // Return the data as props
  return <AppData data={posts}/>
}
