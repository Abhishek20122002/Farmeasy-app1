import BankNavbar from '@/components/navbar/BankNavbar';
import BankSidebar from '@/components/sidebar/BankSidebar';

const BankLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <BankSidebar />
      <div className="flex flex-col flex-1">
        <BankNavbar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BankLayout;
