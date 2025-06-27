import { Suspense } from "react";
import Loading from "../components/Loading";
import SnacksItem from "../pages/SnacksPage/SnacksItem";

const SnacksPage = () => (
  <Suspense fallback={<Loading />}>
    <SnacksItem />
  </Suspense>
);

export default SnacksPage;
