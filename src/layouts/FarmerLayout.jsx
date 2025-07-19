import FarmerNavbar from '@/components/navbar/FarmerNavbar';
import FarmerSidebar from '@/components/sidebar/FarmerSidebar';

const FarmerLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <FarmerSidebar />
      <div className="flex flex-col flex-1">
        <FarmerNavbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FarmerLayout;
