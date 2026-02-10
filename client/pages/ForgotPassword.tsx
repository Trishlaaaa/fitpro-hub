import { Link } from 'react-router-dom';
import PlaceholderPage from '@/components/PlaceholderPage';
import Header from '@/components/Header';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PlaceholderPage
        title="Forgot Password"
        description="Password reset functionality coming soon"
      />
    </div>
  );
}
