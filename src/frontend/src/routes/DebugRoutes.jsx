// routes/DebugRoutes.jsx
import { Routes, Route } from 'react-router-dom';

// Debug Pages
import ImageTestPage from '../pages/debug/ImageTestPage';
import TestDeliveryPage from '../pages/TestDeliveryPage';

function DebugRoutes() {
  return (
    <Routes>
      <Route path="/images" element={<ImageTestPage />} />
      <Route path="/delivery" element={<TestDeliveryPage />} />
      {/* For direct access to test-delivery */}
      <Route path="/" element={<TestDeliveryPage />} />
    </Routes>
  );
}

export default DebugRoutes;
