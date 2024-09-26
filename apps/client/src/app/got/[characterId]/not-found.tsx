import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested character</p>
      <p>
        View <Link href="/got">all characters</Link>
      </p>
    </div>
  );
}
