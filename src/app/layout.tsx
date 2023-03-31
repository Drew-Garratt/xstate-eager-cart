import AppProvider from '@/components/providers/app/AppProvider';
import '@/styles/globals.css';

const RootLayout = (
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  { children }: { children: React.ReactNode }
) => {
  return (
    <AppProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppProvider>
  );
};

export default RootLayout;
