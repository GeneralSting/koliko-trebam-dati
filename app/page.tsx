import Header from "./components/Header";
import StepSection from "./components/StepSection";
import FeedbackBar from "./components/FeedbackBar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pb-32">
      <Header />
      <main className="flex-1 pt-8 sm:pt-10">
        <StepSection />
      </main>
      <FeedbackBar />
    </div>
  );
}
