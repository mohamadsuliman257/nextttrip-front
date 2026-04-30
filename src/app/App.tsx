import Toasty from "./providers/ToastProvider";
import QueryProvider from "./providers/QueryProvider";
import { AppRouter } from "./router/AppRouter";


export default function App() {
  return (
    <>
      <Toasty />        
      <QueryProvider>
        <AppRouter/>
      </QueryProvider>
    </>
  );
}
