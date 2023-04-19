import { useEffect } from "react";
import clsx from "clsx";
import useStore, { IStateStores } from "stores";
import Item from "./Item";

const selector = ({ home }: IStateStores) => ({
  initPage: home.initPage,
  data: home.data.data,
  loading: home.data.loading,
});

const Home = () => {
  const { data, initPage, loading } = useStore(selector);

  useEffect(() => {
    initPage();
  }, [initPage]);

  return (
    <div
      data-testid="test-id-home"
      className={clsx("p-4", { loading })}
      style={{ minHeight: "inherit" }}
    >
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Home;
