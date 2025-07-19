import MerchantNavbar from '@/components/navbar/MerchantNavbar';
import MerchantSidebar from '@/components/sidebar/MerchantSidebar';

const MerchantLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <MerchantSidebar />
      <div className="flex flex-col flex-1">
        <MerchantNavbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MerchantLayout;