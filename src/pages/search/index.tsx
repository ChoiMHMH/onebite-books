import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import Head from "next/head";

// context 라는 매개변수에는 현재 브라우저로 받은 요청에 대한 모든 정보가 다 포함되어 있음
// query 값도 있다.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);
  return {
    props: { books },
  };
};

export default function Page({
  books,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
