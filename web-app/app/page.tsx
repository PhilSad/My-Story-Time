import Header from '@/app/components/header/header';
import HomePage from '@/app/homePage/page';
import "./page.css";

export default function Home() {
  return (
    <main>
      <div className="relative home">
        <Header />
        <HomePage />
      </div>
    </main>
  )
}
