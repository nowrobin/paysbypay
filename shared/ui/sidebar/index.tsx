import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, LayoutDashboard, Store, Settings, Menu, X } from 'lucide-react';

const navigation = [
  { name: '대시보드', href: '/', icon: LayoutDashboard },
  { name: '거래 내역', href: '/transactions', icon: CreditCard },
  { name: '가맹점', href: '/merchants', icon: Store },
  { name: '설정', href: '/settings', icon: Settings },
];

function SideBar() {
  return (
    <aside className="fixed w-80 bg-white rounded-2xl pl-6 py-11 flex flex-col justify-between h-screen">
      <nav className="text-xl text-black flex flex-col w-full gap-3">
        <div>LOGO</div>
        <Link href="/dashBoard">대시보드</Link>
        <Link href="/merchants">가맹점</Link>
        <Link href="/transactions">개래 내역</Link>
      </nav>
      <div className="flex flex-row gap-4">
        <Image src={'/globe.svg'} alt={''} width={40} height={40}></Image>
        <div className="flex flex-col gap-2">
          <span>한정욱</span>
          <span>nowrobin3@gmail.com</span>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
