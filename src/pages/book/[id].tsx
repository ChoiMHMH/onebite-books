import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import fetchOneBooks from "@/lib/fetch-one-books";
import { notFound } from "next/navigation";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   // context의 params 가 undefined일 수도 있으므로 값이 있을 것이다 단언
//   // 이렇게 해도 안전한 이유는 [id]는 무조건 id 값이 있어야만 접근이 가능한 페이지 이므로.
//   // url 파라미터가 없다는 것은 말이 안되기 때문에.
//   const id = context.params!.id;
//   const book = await fetchOneBooks(Number(id));

//   return {
//     props: { book },
//   };
// };

export const getStaticPaths = () => {
  return {
    //paths의 값은 문자열로 해주어야함 : "1" 처럼
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    //대체 : 설정한 params가 없을 경우
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};
export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  if (!book) {
    return "문제가 발생했습니다 다시 시도하세요";
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
