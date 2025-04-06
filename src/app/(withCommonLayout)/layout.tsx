import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header";
import StairTransition from "@/components/shared/StairTransition";

const CommonLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Header />
      <StairTransition />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
