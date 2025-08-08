import { Layout } from "@/components/Layout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";

export default function Home() {
  return (
    <Layout>
      <section className="space-y-6">

        <ProfileHeader
          name="Miguel Trinidad"
          verified={true}
          location="Cebu City, Philippines"
          role="Full Stack Web Developer | Aspiring DevOps"
          profileImage="/images/migueltrinidad.jpg"
          achievement=""
        />

        <p>
          Welcome to my portfolio! Here you’ll find my projects, Strava
          activities, and more.
        </p>
      </section>
    </Layout>
  );
}
