import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BankCheckerPage } from './pages/BankCheckerPage';
import { HomePage } from './pages/HomePage';
import { KnowledgePage } from './pages/KnowledgePage';
import { MessageCheckerPage } from './pages/MessageCheckerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhoneCheckerPage } from './pages/PhoneCheckerPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { QuizPage } from './pages/QuizPage';
import { SupportPage } from './pages/SupportPage';
import { UrlCheckerPage } from './pages/UrlCheckerPage';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<Navigate to="/check/message" replace />} />
          <Route path="/check/message" element={<MessageCheckerPage />} />
          <Route path="/check/url" element={<UrlCheckerPage />} />
          <Route path="/check/phone" element={<PhoneCheckerPage />} />
          <Route path="/check/bank" element={<BankCheckerPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/knowledge/:slug" element={<ArticleDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
