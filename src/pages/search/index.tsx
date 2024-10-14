import { useRouter } from "next/router";
function Search() {
  const route = useRouter();
  const { q } = route.query;
  return <div>search {q}</div>;
}
export default Search;
