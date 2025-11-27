import Link from 'next/link';
import Image from 'next/image';

function Header() {
  return (
    <header className="fixed top-0 w-full h-12 px-14 z-20 bg-white py-2 flex flex-row justify-between items-center">
      <nav className="text-lg text-black flex flex-row  gap-3">
        <div className="text-xl font-bold">ALLPAYS</div>
        <Link href="/">대시보드</Link>
        <Link href="/merchants">가맹점</Link>
        <Link href="/payments">개래 내역</Link>
      </nav>
      <div className="flex flex-row gap-4">
        <Image src={'/globe.svg'} alt={''} width={28} height={28}></Image>
        <div className="flex flex-col">
          <span className="text-sm">한정욱</span>
          <span className="text-sm">nowrobin3@gmail.com</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
