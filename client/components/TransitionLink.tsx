import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({
  to,
  children,
  className,
}: TransitionLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Navigate après que l'écran noir couvre tout (0.4s)
    setTimeout(() => {
      navigate(to);
    }, 400);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
