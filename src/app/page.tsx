import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Miguel Trinidad</h1>
            <p className="text-muted-foreground">Web Developer & Aspiring DevOps Engineer</p>
          </div>
        </header>

        <p>
          Welcome to my portfolio! Here you’ll find my projects, Strava activities, and more.
        </p>
      </section>
    </Layout>
  );
}
