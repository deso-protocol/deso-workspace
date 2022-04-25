import { ThreadCategory } from '../../../services/utils';
import { Link } from 'react-router-dom';
export interface DrawerLinkProps {
  to: string;
  title: string;
  index: string;
  category?: ThreadCategory;
}
export const DrawerLink = ({ index, to, title }: DrawerLinkProps) => {
  return (
    <Link
      className="pb-2 px-4 hover:underline cursor-pointer block ml-6"
      key={to || Math.random()}
      to={to}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' } as any);
      }}
    >
      {title}
    </Link>
  );
};
