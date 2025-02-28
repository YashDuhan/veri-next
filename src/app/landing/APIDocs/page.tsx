import APIDocs from './APIDocs';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';

export const metadata = {
  title: 'API Documentation - VeriTrust',
  description: 'Integrate VeriTrust verification into your applications with our simple and powerful API',
};

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <APIDocs />
      </main>
      <Footer />
    </div>
  );
} 