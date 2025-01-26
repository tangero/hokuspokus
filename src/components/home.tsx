import ActivityList from "./activity/activity-list";
import { useTranslation } from "react-i18next";
import Layout from "./shared/layout";

function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto space-y-8">
        <ActivityList />
      </div>
    </Layout>
  );
}

export default Home;
