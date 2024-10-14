import { useRouter } from "next/router";

function Book() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>book {id}</h1>;
}
export default Book;
